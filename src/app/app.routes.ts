import { Routes } from '@angular/router';
import { LoginForm } from './components/login-form/login-form';
import { RegistrationForm } from './components/registration-form/registration-form';
import { Courses } from './components/courses/courses';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginForm },
  { path: 'register', component: RegistrationForm },
  { path: 'courses', component: Courses, canActivate: [authGuard] },
];
