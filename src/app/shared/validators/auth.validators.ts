import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { authMessages } from '../constants';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (control.value && !emailRegex.test(control.value)) {
      return { emailInvalid: authMessages.EMAIL_INVALID };
    }
    return null;
  };
}

export function passwordMinValidator(min = 8): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value.length < min) {
      return { passwordMin: authMessages.PASSWORD_MIN };
    }
    return null;
  };
}

export function passwordMaxValidator(max = 15): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value.length > max) {
      return { passwordMax: authMessages.PASSWORD_MAX };
    }
    return null;
  };
}

export function confirmPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.parent?.get('password')?.value;
    if (control.value && password && control.value !== password) {
      return { confirmPasswordMismatch: authMessages.CONFIRM_PASSWORD_MISMATCH };
    }
    return null;
  };
}
