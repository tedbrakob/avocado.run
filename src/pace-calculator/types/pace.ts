import Validatable from "./validatable";
import Distance from "./distance";
import Time from "../../models/time";

export default class Pace extends Validatable{
  time:Time;
  distance:Distance;

  constructor(time: Time, distance: Distance) {
    super();

    this.time = time;
    this.distance = distance;
  }

  valid = ():boolean => {
    return this.time.valid() && this.distance.valid();
  };

  convertDistance = (distance: Distance):Pace => {
    const unitConversionFactor = this.distance.getConversionFactor(distance.unit);
    const quantityConversionFactor = distance.quantity / this.distance.quantity;

    const timeSeconds = this.time.getTotalSeconds();
    const convertedSeconds = timeSeconds * unitConversionFactor * quantityConversionFactor;
    const convertedTime = Time.createFromTotalSeconds(convertedSeconds);
    
    return new Pace(convertedTime, distance);
  };
};