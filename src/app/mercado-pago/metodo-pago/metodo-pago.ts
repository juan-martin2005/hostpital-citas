import { Component } from '@angular/core';
import { MercadoPagoBrickService } from '../service/service-brick';
import { ActivatedRoute } from '@angular/router';
import { EspecialidadService } from '../../core/services/especialidad/especialidad';
import { DoctorService } from '../../core/services/doctor/doctor';
import { map, switchMap, tap } from 'rxjs';

interface DoctorEntity {
  id?: number;
  email?: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  sexo?: string;
  especialidad?: string;
}

@Component({
  selector: 'app-metodo-pago',
  imports: [],
  templateUrl: './metodo-pago.html',
  styleUrl: './metodo-pago.css'
})
export class MetodoPago{
  doctor : DoctorEntity | undefined
  constructor(private mercadoPagoBrickService: MercadoPagoBrickService, private route: ActivatedRoute,
    private espService: EspecialidadService,
    private docService: DoctorService
  ){}
  ngOnInit(){
    this.realizarPago()

  }
  ngOnDestroy(): void {
    this.mercadoPagoBrickService.destruirInstance()
  }


  realizarPago(): void {
    const doctorId = Number(this.route.snapshot.queryParamMap.get('doctorId'));
    const horarioId = Number(this.route.snapshot.queryParamMap.get('horarioId'));

    this.docService.listarTodosLosDoctores().pipe(
      map(doctores => doctores.find(doc => doc.id === doctorId)),
      switchMap(doctor => {
        this.doctor = doctor;
        return this.espService.listarEspecialidades().pipe(
          map(especialidades => especialidades.find(esp => esp.nombre === doctor?.especialidad)?.precio)
        );
      }),
      switchMap(precioEspecialidad => {
        const precioCita = Number(precioEspecialidad);
        return this.mercadoPagoBrickService.getPrefenceId().pipe(
          tap(pref => this.mercadoPagoBrickService.loadMpBrick(pref.id, precioCita, doctorId, horarioId))
        );
      })
    ).subscribe({
      next: () => console.log('Pago inicializado correctamente'),
      error: err => console.error('Error en el proceso de pago', err)
    });
  }

}
