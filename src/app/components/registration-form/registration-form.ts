import { Component } from '@angular/core';
import { SHARED_MODULES } from '../../shared/shared-imports';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../../shared/shared-service';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [SHARED_MODULES,RouterModule],
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.scss',
})
export class RegistrationForm {
  public registrationForm: FormGroup<{
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    mobile: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _sharedService: SharedService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, this.passwordValidator]],
    });
  }
  // Custom validator for password strength
  private passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[\W_]/.test(value);
    const isLongEnough = value.length >= 8;

    const valid =
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar &&
      isLongEnough;

    return valid
      ? null
      : {
          passwordStrength:
            'Password must include uppercase, lowercase, number, special character and be at least 8 characters long.',
        };
  }
  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const email = this.registrationForm.get('email')?.value;
      const name = this.registrationForm.get('name')?.value;
      const user = this._sharedService.registeredUsers.find(
        (user) => user.email === name && user.name === name
      );
      //If user doesn't exist, add in array to store all users
      if (!user) {
        this._sharedService.registeredUsers.push({ name: name, email: email });
      }
      this.router.navigate(['/login']);
    }
  }
}
