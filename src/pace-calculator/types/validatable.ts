export default abstract class Validatable {
  abstract valid(): boolean;
  
  assertValid = (errorMessage: string = "Invalid " + this.constructor.name):void => {
    if (!this.valid()) {
      throw new Error(errorMessage);
    }
  };
}