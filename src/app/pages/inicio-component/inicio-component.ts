import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio-component',
  imports: [NgStyle],
  templateUrl: './inicio-component.html',
  styleUrl: './inicio-component.css'
})
export class InicioComponent {

  obtenerTema(){
    return localStorage.getItem('theme');
  }
  backgroundEstilo = {
    claro: "linear-gradient(rgba(224,242,247,0.7), rgba(224,242,247,0.7)), url('hospital.jpg')",
    oscuro: "linear-gradient(rgba(72,74,85,0.8), rgba(72,73,82,0.8)), url('hospital.jpg')"
  };
  /*
  modo oscuro
  rgba(72, 74, 85, 0.8), rgba(72, 73, 82, 0.8)

  modo claro
  rgba(224, 242, 247, 0.7), rgba(224, 242, 247, 0.7)
  */
}
