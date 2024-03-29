import { kilometer, mile } from "../../static/distances";
import { calculateDistance, calculatePace, calculateSplits, calculateTime } from "../calculator";
import Distance from "../types/distance";
import Pace from "../types/pace";
import Time from "../../models/time";

test('calculates time', () => {
  let pace = new Pace(new Time(0, 6, 0), new Distance(1, mile));
  let distance = new Distance(5, mile);

  let time = calculateTime(pace, distance);

  expect(time.hours).toStrictEqual(0);
  expect(time.minutes).toStrictEqual(30);
  expect(time.seconds).toStrictEqual(0);
});

test('calculateTime identifies invalid distance', () => {
  let pace = new Pace(new Time(0, 6, 0), new Distance(1, mile));
  let distance = new Distance(0, mile);

  expect(() => {calculateTime(pace, distance)}).toThrow("Invalid Distance");
});

test('calculateTime identifies invalid pace', () => {
  let pace = new Pace(new Time(0, 0, 0), new Distance(1, mile));
  let distance = new Distance(5, mile);

  expect(() => {calculateTime(pace, distance)}).toThrow("Invalid Pace");
});

test('calculates distance', () => {
  let time = new Time(0, 30, 0);
  let pace = new Pace(new Time(0, 6, 0), new Distance(1, mile));

  let distance = calculateDistance(time, pace, mile);

  expect(distance.unit).toStrictEqual(mile);
  expect(distance.quantity).toStrictEqual(5);
});

test('calculateDistance identifies invalid time', () => {
  let time = new Time(0, 0, 0);
  let pace = new Pace(new Time(0, 6, 0), new Distance(1, mile));

  expect(() => {calculateDistance(time, pace, mile)}).toThrow("Invalid Time");
});

test('calculateDistance identifies invalid pace', () => {
  let time = new Time(0, 30, 0);
  let pace = new Pace(new Time(0, 0, 0), new Distance(1, mile));

  expect(() => {calculateDistance(time, pace, mile)}).toThrow("Invalid Pace");
});

test('calculates pace in same unit', () => {
  let time = new Time(0, 30, 0);
  let distance = new Distance(5, mile);
  let per = new Distance(1, mile);

  let pace = calculatePace(time, distance, per);

  expect(pace.distance.unit).toStrictEqual(mile);
  expect(pace.distance.quantity).toStrictEqual(1);

  expect(pace.time.hours).toStrictEqual(0);
  expect(pace.time.minutes).toStrictEqual(6);
  expect(pace.time.seconds).toStrictEqual(0);
});

test('calculates pace in different unit', () => {
  let time = new Time(0, 30, 0);
  let distance = new Distance(5, mile);
  let per = new Distance(1, kilometer);

  let pace = calculatePace(time, distance, per);

  expect(pace.distance.unit).toStrictEqual(kilometer);
  expect(pace.distance.quantity).toStrictEqual(1);

  expect(pace.time.hours).toStrictEqual(0);
  expect(pace.time.minutes).toStrictEqual(3);
  expect(pace.time.seconds).toBeCloseTo(43.694);
});

test('calculates pace correctly', () => {
  let time = new Time(0, 5, 10);
  let distance = new Distance(5, kilometer);
  let per = new Distance(1, mile);

  let pace = calculatePace(time, distance, per);

  expect(pace.distance.unit).toStrictEqual(mile);
  expect(pace.distance.quantity).toStrictEqual(1);

  expect(pace.time.hours).toStrictEqual(0);
  expect(pace.time.minutes).toStrictEqual(1);
  expect(pace.time.seconds).toBeCloseTo(39.779);
});

test('calculatePace identifies invalid time', () => {
  let time = new Time(0, 0, 0);
  let distance = new Distance(5, mile);
  let per = new Distance(1, kilometer);

  expect(() => {calculatePace(time, distance, per)}).toThrow("Invalid Time");
});

test('calculatePace identifies invalid distance', () => {
  let time = new Time(0, 30, 0);
  let distance = new Distance(0, mile);
  let per = new Distance(1, kilometer);

  expect(() => {calculatePace(time, distance, per)}).toThrow("Invalid Distance");
});

test('calculatePace identifies invalid pace distance unit', () => {
  let time = new Time(0, 30, 0);
  let distance = new Distance(5, mile);
  let per = new Distance(0, kilometer);

  expect(() => {calculatePace(time, distance, per)}).toThrow("Invalid pace unit");
});

test('calculateSplits throws error with two invalid params', () => {
  let time = new Time(0, 0, 0);
  let distance = new Distance(0, mile);
  let pace = new Pace(new Time(0, 6, 0), new Distance(1, mile));

  expect(() => {calculateSplits(time, distance, pace)}).toThrow("To calculate Splits, enter at least two of Time, Distance and Pace");
});