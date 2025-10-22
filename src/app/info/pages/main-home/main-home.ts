import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {Footer} from '../../../components/footer/footer';
import {Header} from '../../../components/header/header';
import {Login} from '../auth/login/login';
import {RegisterComponent} from '../auth/register/register';

@Component({
  selector: 'app-main-home',
  imports: [
    RouterOutlet,
    Footer,
    Header,
    Login,
    RegisterComponent,
  ],
  templateUrl: './main-home.html',
  styleUrl: './main-home.css'
})
export class MainHome {

}
