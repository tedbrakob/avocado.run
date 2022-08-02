import { kilometer, mile } from "../../static/distances";
import Distance from "../types/distance";

test("identifies invalid unit", () => {
  let distance = new Distance(1, "invalidUnit");
  expect(distance.valid()).toBeFalsy();
});

test("identifies invalid quantity", () => {
  let distance = new Distance(0, mile);
  expect(distance.valid()).toBeFalsy();
});

test("identifies valid distance", () => {
  let distance = new Distance(1, mile);
  expect(distance.valid()).toBeTruthy();
});

test("correctly converts from miles to kilometers", () => {
  let distance = new Distance(26.21875, mile);
  let converted = distance.convertTo(kilometer);

  expect(converted.quantity).toBeCloseTo(42.19);
  expect(converted.unit).toStrictEqual(kilometer);
});