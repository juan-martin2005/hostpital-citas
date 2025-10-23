import {Component, OnInit} from '@angular/core';
import {Navbar} from '../../components/navbar/navbar';
import {RouterOutlet} from '@angular/router';
import {SidebarPaciente} from '../paciente/sidebar-paciente/sidebar-paciente';
import {SidebarAdmin} from './sidebar-admin/sidebar-admin';

@Component({
  selector: 'app-admin',
  imports: [
    Navbar,
    RouterOutlet,
    SidebarAdmin
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
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
