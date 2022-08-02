export default class Time {
  hours: number;
  minutes: number;
  seconds: number;

  constructor (hours: number, minutes: number, seconds: number) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  static createFromTotalSeconds = (seconds: number):Time => {
    const hours = Math.floor(seconds / (60 * 60));
    seconds -= hours * (60 * 60);

    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    
    return new Time(hours, minutes, seconds);
  }

  valid = ():boolean => {
    return this.getTotalSeconds() > 0;
  }

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
}