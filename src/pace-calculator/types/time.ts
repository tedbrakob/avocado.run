import Validatable from "./validatable";

export default class Time extends Validatable {
  hours: number;
  minutes: number;
  seconds: number;

  constructor (hours: number, minutes: number, seconds: number) {
    super();

    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  valid = ():boolean => {
    return this.getTotalSeconds() > 0;
  };

  static createFromTotalSeconds = (seconds: number):Time => {
    const time = new Time(0, 0, seconds);
    time.normalize();
    return time;
  };

  getTotalSeconds = ():number => {
    let seconds = 0;

    if (this.hours) {
      seconds += this.hours * 60 * 60;
    }
    if (this.minutes) {
      seconds += this.minutes * 60;
    }
    if (this.seconds) {
      seconds += this.seconds;
    }

    return seconds;
  };

  normalize = ():void => {
    let seconds = this.getTotalSeconds();

    this.hours = Math.floor(seconds / (60 * 60));
    seconds -= this.hours * (60 * 60);

    this.minutes = Math.floor(seconds / 60);
    seconds -= this.minutes * 60;

    this.seconds = seconds;
  }

  toString = ():string => {
    this.normalize();

    (this.seconds).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    let result = '';

    if (this.hours > 0) {
      result += this.hours.toString() + ':';
      result += String(this.minutes).padStart(2, '0') + ':';
    } else if (this.minutes > 0) {
      result += this.minutes.toString() + ':';
    }

    result += (this.seconds).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').padStart(4, '0');

    return result;
  }
};