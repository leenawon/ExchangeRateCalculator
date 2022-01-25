/*
1.수취금액을 입력하지 않거나, 0보다 작은 금액이거나 10,000 USD보다 큰 금액,혹은 바른 숫자가 아니라면 “송금액이 바르지 않습니다"라는 에러 메시지를 보여줍니다. 

2.환율과 수취금액은 소숫점 2째자리까지, 3자리 이상 되면 콤마를 가운데 찍어 보여줍니다. 예를 들어 1234라면 1,234.00으로 나타냅니다.
*/

import { moneySubmit } from "../pages/first/fucntion";

it("1000을 입력하였을 경우", () => {
  expect(moneySubmit(1000)).toBe("1,000,000.00");
});

it("10,000보다 큰 숫자가 입력되었을 경우", () => {
  expect(moneySubmit(10001)).toEqual(null);
});

it("0보다 작은 숫자가 입력되었을 경우", () => {
  expect(moneySubmit(-1)).toEqual(null);
});

it("문자열이 입력되었을 경우", () => {
  expect(moneySubmit("문자")).toEqual(null);
});

it("1579을 입력하였을 경우", () => {
  expect(moneySubmit(1579)).toEqual("1,579,000.00");
});
