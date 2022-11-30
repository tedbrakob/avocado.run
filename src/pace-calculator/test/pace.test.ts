import { meter, mile } from '../../static/distances';
import Distance from '../types/distance';
import Pace from '../types/pace';
import Time from '../../models/time';

test('correctly converts distance', () => {
  const pace = new Pace(new Time(0, 6, 0), new Distance(1, mile));

  const convertedPace = pace.convertDistance(new Distance(1500, meter));

  expect(convertedPace.distance.unit).toStrictEqual(meter);
  expect(convertedPace.distance.quantity).toStrictEqual(1500);
  expect(convertedPace.time.getTotalSeconds()).toBeCloseTo(335.5412);
});

test('identifies invalid paces', () => {
  let pace = new Pace(new Time(0, 0, 0), new Distance(1, mile));
  expect(pace.valid()).toBeFalsy();

  pace = new Pace(new Time(0, 0, 50), new Distance(1, "invalidUnit"));
  expect(pace.valid()).toBeFalsy();
});