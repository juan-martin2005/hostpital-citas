import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-barra-nav-component',
  imports: [RouterLink, NgClass],
  templateUrl: './barra-nav-component.html',
  styleUrl: './barra-nav-component.css'
})
export class BarraNavComponent {
  isDarkMode: boolean = false;

  ngOnInit(){
    localStorage.setItem('theme','#ffffff');
    const tema = localStorage.getItem('theme');
    if (tema) {
      this.isDarkMode = tema === '#101d23';
      this.updateTheme();
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? '#101d23' : '#ffffff');
    this.updateTheme();
  }
  private updateTheme(): void {
    if (this.isDarkMode) {
      document.body.style = 'background-color: #283038ff;';
      document.body.setAttribute('data-bs-theme', 'dark')
    } else {
      document.body.style = 'background-color: #e0f3f6';
      document.body.removeAttribute('data-bs-theme');
    }
  }

}
