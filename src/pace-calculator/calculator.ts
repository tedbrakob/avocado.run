import Distance from "./types/distance";
import Pace from "./types/pace";
import Splits from "./types/splits";
import Time from "../models/time";
import Unit from "./types/unit";

export const calculateTime = (pace: Pace, distance: Distance):Time => {
  distance.assertValid();
  pace.assertValid();

  const paceTimeInSeconds = pace.time.getTotalSeconds();
  const distanceInPaceUnits = distance.convertTo(pace.distance.unit);

  const timeInSeconds:number = (paceTimeInSeconds * distanceInPaceUnits.quantity) / pace.distance.quantity;

  return Time.createFromTotalSeconds(timeInSeconds);
};

export const calculateDistance = (time: Time, pace: Pace, asUnit: Unit):Distance => {
  time.assertValid();
  pace.assertValid();

  const paceTimeInSeconds = pace.time.getTotalSeconds();
  const timeInSeconds = time.getTotalSeconds();
  
  const distanceQuantity = timeInSeconds / paceTimeInSeconds;
  
  let distance = new Distance(distanceQuantity, pace.distance.unit);
  distance = distance.convertTo(asUnit);

  return distance;
};

export const calculatePace = (time: Time, distance: Distance, per: Distance):Pace => {
  time.assertValid();
  distance.assertValid()
  per.assertValid('Invalid pace unit');
  
  return new Pace(time, distance).convertDistance(per);
};

const calculateMissing = (time:Time, distance:Distance, pace:Pace):{time:Time, distance:Distance, pace:Pace} => {
  let missingParams:string[] = [];

  for (const [key, param] of Object.entries({time, distance, pace})) {
    if (!param.valid()) {
      missingParams.push(key);
    }

    if (missingParams.length > 1) {
      throw new Error("To calculate Splits, enter at least two of Time, Distance and Pace");
    }
  }

  if (missingParams.length === 0) {
    return {time, distance, pace};
  }

  switch (missingParams[0]) {
    case 'time':
      time = calculateTime(pace, distance);
      break;
    case 'distance':
      distance = calculateDistance(time, pace, distance.unit);
      break;
    case 'pace':
      pace = calculatePace(time, distance, pace.distance);
      break;
  }

  return {time, distance, pace};
};

const formatSplitDistanceQuantity = (distanceQuantity:number) => {
  return +distanceQuantity.toFixed(2);
}


export const calculateSplits = (time:Time, distance:Distance, pace:Pace):Splits => {
  ({time, distance, pace} = calculateMissing(time, distance, pace));

  const splits:Pace[] = [];
  
  const secondsPerSplit = pace.time.getTotalSeconds();
  const totalSeconds = time.getTotalSeconds();

  const numberOfSplits = totalSeconds / secondsPerSplit;

  for (let i = 1; i < numberOfSplits; i++) {
    const splitDistance = new Distance(i * pace.distance.quantity, pace.distance.unit);
    const splitTime = Time.createFromTotalSeconds(i * secondsPerSplit);

    splits.push(new Pace(splitTime, splitDistance));
  }

  if (numberOfSplits > splits.length) {
    let splitDistance = distance.convertTo(pace.distance.unit);
    splitDistance.quantity = formatSplitDistanceQuantity(splitDistance.quantity);

    splits.push(new Pace(time, splitDistance));
  }

  return new Splits(splits);
}