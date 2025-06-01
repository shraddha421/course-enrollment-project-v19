import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared-service';
import { SHARED_MODULES } from '../../shared/shared-imports';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  public user = {
    email: '',
    password: '',
  };
  constructor(private _sharedService: SharedService, private router: Router) {}

  ngOnInit(): void {}
  public onLogin(form: any): void {
    if (form.valid) {
      //Check If user already exists
      const existingUser = this._sharedService.registeredUsers.find(
        (reguser) => reguser.email === this.user.email
      );
      if (existingUser) {
        console.log('Login Successful', this.user);
        this._sharedService.setLoggedInUserName = this.user.email;
        this.router.navigate(['/courses']);
      } else {
        alert(`You are not yet registered! Please register first`);
        this.router.navigate(['/register']);
      }
    }
  }
  public routeToRegister() {
    this.router.navigate(['/register']);
  }
}
