import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraNavComponent } from "./components/barra-nav-component/barra-nav-component";
import { FooterComponent } from "./components/footer-component/footer-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BarraNavComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
