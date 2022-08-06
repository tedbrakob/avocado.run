import Distance from "./types/distance";
import Pace from "./types/pace";
import Time from "./types/time";
import Unit from "./types/unit";

function assertTimeValid(time: Time, errorMessage?: string):void {
  if (!time.valid()) {
    if (typeof(errorMessage) === "undefined") {
      errorMessage = "Invalid time";
    }

    throw new Error(errorMessage);
  }
}

function assertDistanceValid(distance: Distance, errorMessage?: string):void {
  if (!distance.valid()) {
    if (typeof(errorMessage) === "undefined") {
      errorMessage = "Invalid distance";
    }

    throw new Error(errorMessage);
  }
}

function assertPaceValid(pace: Pace, errorMessage?: string):void {
  if (!pace.valid()) {
    if (typeof(errorMessage) === "undefined") {
      errorMessage = "Invalid pace";
    }

    throw new Error(errorMessage);
  }
}

export const calculateTime = (pace: Pace, distance: Distance):Time => {
  assertDistanceValid(distance);
  assertPaceValid(pace);

  const paceTimeInSeconds = pace.time.getTotalSeconds();
  const distanceInPaceUnits = distance.convertTo(pace.distance.unit);

  const timeInSeconds:number = (paceTimeInSeconds * distanceInPaceUnits.quantity) / pace.distance.quantity;

  return Time.createFromTotalSeconds(timeInSeconds);
};

export const calculateDistance = (time: Time, pace: Pace, asUnit: Unit):Distance => {
  assertTimeValid(time);
  assertPaceValid(pace);

  const paceTimeInSeconds = pace.time.getTotalSeconds();
  const timeInSeconds = time.getTotalSeconds();
  
  const distanceQuantity = timeInSeconds / paceTimeInSeconds;
  
  let distance = new Distance(distanceQuantity, pace.distance.unit);
  distance = distance.convertTo(asUnit);

  return distance;
};

export const calculatePace = (time: Time, distance: Distance, per: Distance):Pace => {
  assertTimeValid(time);
  assertDistanceValid(distance);
  assertDistanceValid(per, 'Invalid pace unit');
  
  return new Pace(time, distance).convertDistance(per);
};