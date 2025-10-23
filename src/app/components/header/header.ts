import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {LoginService} from '../../core/services/auth/login/login';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(
    private loginService: LoginService,
    private router: Router

  ) {}

  onIngresarClick(event: Event): void {

    if (this.loginService.isAdminAuthenticate()) {
      event.preventDefault();
      this.closeModal();
      this.router.navigate(['/inicio/admin']);

    } else if (this.loginService.isDoctorAuthenticate()) {
      event.preventDefault();
      this.closeModal();
      this.router.navigate(['/inicio/doctor']);

    } else if (this.loginService.isPacienteAuthenticate()) {
      event.preventDefault();
      this.closeModal();
      this.router.navigate(['/inicio/paciente']);
    }
  }

  private closeModal(): void {
    const modalElement = document.getElementById('authModal');

    if (modalElement) {
      const modalInstance = (window as any).bootstrap?.Modal.getInstance(modalElement);

      if (modalInstance) {
        modalInstance.hide();
      } else {
        // Si no existe instancia, crear una y cerrarla
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.hide();
      }

      setTimeout(() => {
        modalElement.classList.remove('show', 'fade');
        modalElement.style.display = 'none';
        modalElement.setAttribute('aria-hidden', 'true');
        modalElement.removeAttribute('aria-modal');
        modalElement.removeAttribute('role');

        document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());

        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.body.removeAttribute('data-bs-overflow');
        document.body.removeAttribute('data-bs-padding-right');
      }, 300);
    }
  }
}
