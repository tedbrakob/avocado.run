import { distanceUnits, metersPerUnit } from "../../static/distances";
import Validatable from "./validatable";
import Unit from "./unit";
export default class Distance extends Validatable {
  unit: Unit;
  quantity: number;

  constructor (quantity:number, unit:Unit) {
    super();
    
    this.quantity = quantity;
    this.unit = unit;
  }

  valid = ():boolean => {
    return distanceUnits.includes(this.unit)
      && this.quantity > 0;
  };

  getMeters = ():number => {
    return this.quantity * metersPerUnit[this.unit];
  };

  convertTo = (unit: Unit):Distance => {
    const conversionFactor = this.getConversionFactor(unit);
    const quantity = this.quantity / conversionFactor;

    return new Distance(quantity, unit);
  };

  getConversionFactor = (convertingTo: Unit):number => {
    const originalUnitInMeters = metersPerUnit[this.unit];
    const destinationUnitInMeters = metersPerUnit[convertingTo];

    return destinationUnitInMeters / originalUnitInMeters;
  };
};