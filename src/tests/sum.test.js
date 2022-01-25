import { sum, message, thousand } from "../sum";

it("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

it("adds 3 + 4 to equal7", () => {
  expect(sum(3, 4)).toEqual(7);
});

it("message", () => {
  expect(message(1001)).toEqual("값이 너무 큽니다.");
});
it("input > 1000 ? 1000 : input ", () => {
  expect(thousand(1001)).toEqual(999);
});
