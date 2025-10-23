import {Component, OnInit} from '@angular/core';
import {Navbar} from '../../components/navbar/navbar';
import {RouterOutlet} from '@angular/router';
import {SidebarDoctor} from './sidebar-doctor/sidebar-doctor';

@Component({
  selector: 'app-doctor',
  imports: [
    Navbar,
    RouterOutlet,
    SidebarDoctor
  ],

  templateUrl: './doctor.html',
  styleUrl: './doctor.css'
})
export class Doctor implements OnInit {
  sidebarToggled = false;

  ngOnInit() {
    const savedState = localStorage.getItem('sb|sidebar-toggle');
    if (savedState === 'true') {
      this.sidebarToggled = true;
      document.body.classList.add('sb-sidenav-toggled');
    }
  }

  toggleSidebar() {
    this.sidebarToggled = !this.sidebarToggled;
    document.body.classList.toggle('sb-sidenav-toggled');
    localStorage.setItem('sb|sidebar-toggle', this.sidebarToggled.toString());
  }

  ngOnDestroy() {
    document.body.classList.remove('sb-sidenav-toggled');
  }
}
