import Time from "../../models/time"

test("identifies invalid time", () => {
  let time = new Time(0, 0, 0);
  expect(time.valid()).toBeFalsy();
});

test("identifies valid time", () => {
  let time = new Time(0, 0, 1);
  expect(time.valid()).toBeTruthy();
})

test("correctly creates from seconds", () => {
  let time = Time.createFromTotalSeconds(3661);
  expect(time.hours).toEqual(1);
  expect(time.minutes).toEqual(1);
  expect(time.seconds).toEqual(1);
});

test("correctly calculates total seconds", () => {
  let time = new Time(1, 1, 1);
  expect(time.getTotalSeconds()).toStrictEqual(3661);
});