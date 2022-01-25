import { checkDecimal } from '../pages/first/fucntion';

it('1000을 입력하였을 경우', () => {
  expect(checkDecimal('1000')).toBe('1000.00');
});

it('소수점이 2자리 있는 경우', () => {
  expect(checkDecimal('301.01')).toEqual('301.01');
});

it('소수점이 1자리 있는 경우', () => {
  expect(checkDecimal('427.1')).toEqual('427.10');
});

it('0이 입력되었을 경우', () => {
  expect(checkDecimal('0')).toEqual('0.00');
});

it('숫자가 아닐 경우', () => {
  expect(checkDecimal('한글')).toEqual('한글.00');
});
