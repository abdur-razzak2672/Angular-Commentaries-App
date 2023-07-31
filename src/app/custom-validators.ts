import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailWithAtValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email: string = control.value;
    if (email && email.indexOf('@') === -1) {
      return { emailWithAt: true };
    }
    return null;
  };
}
