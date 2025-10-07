import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-component',
  imports: [NgStyle],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.css'
})
export class FooterComponent {

  obtenerTema(){
    return localStorage.getItem('theme');
  }
}
