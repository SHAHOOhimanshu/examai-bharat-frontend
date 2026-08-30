import { Hero } from './Features/Modules/Pages/hero/hero';
import { Login } from './Features/Auth/login/login';
import { SignUp } from './Features/Auth/sign-up/sign-up';
import { Footer } from './Shared/Component/footer/footer';
import { Navbar } from './Shared/Component/navbar/navbar';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: Hero,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'signup',
    component: SignUp,
  },
];
