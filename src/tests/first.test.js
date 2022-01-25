import { moneySubmit } from '../pages/first/fucntion';

it('1000을 입력하였을 경우', () => {
  expect(moneySubmit(1000)).toBe('1,000,000.00');
});

it('10,000보다 큰 숫자가 입력되었을 경우', () => {
  expect(moneySubmit(10001)).toEqual(null);
});

it('0보다 작은 숫자가 입력되었을 경우', () => {
  expect(moneySubmit(-1)).toEqual(null);
});

it('문자열이 입력되었을 경우', () => {
  expect(moneySubmit('문자')).toEqual(null);
});

it('1579을 입력하였을 경우', () => {
  expect(moneySubmit(1579)).toEqual('1,579,000.00');
});
