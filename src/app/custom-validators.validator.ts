import { AbstractControl } from "@angular/forms";

export class CustomValidators {
  /**
   * Validates 10 to negative 10
   * @param control
   * @returns
   */
  static numberBetween10AndNegative10(control: AbstractControl) {
    const controlValue = parseInt(control.value);

    if (controlValue <= 10 && controlValue >= -10) {
      // input is valid
      return null;
    }

    // input is not valid, we can return any object. In our case we return
    // an object with the adult property set to false
    return {
      valid: false,
    };
  }
}
