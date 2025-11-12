import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EspecialidadService } from '../../../core/services/especialidad/especialidad';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

interface EspecialidadFormControls {
  id: FormControl<number>;
  nombre: FormControl<string>;
  descripcion: FormControl<string>;
  precio: FormControl<number | null>;
}
@Component({
  selector: 'app-nueva-especialidad',
  imports: [ReactiveFormsModule],
  templateUrl: './nueva-especialidad.html',
  styleUrl: './nueva-especialidad.css'
})
export class NuevaEspecialidad {

  constructor(private service: EspecialidadService, private route: ActivatedRoute, private router: Router) { }

  especialidadForm = new FormGroup<EspecialidadFormControls>({
    id: new FormControl(0, {
      nonNullable: true}),
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    }),
    descripcion: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(50)]
    }),
    precio: new FormControl(null , {
      nonNullable: true,
      validators: [Validators.required]
    })

  })
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(query =>{
        const id = query.get('id')
        this.service.listarEspecialidadById(Number(id)).subscribe(espe =>{
          this.especialidadForm.patchValue(espe)
        })
    })
  }

  onSubmit(form: any) {
    if (this.especialidadForm.invalid) {
      this.especialidadForm.markAllAsTouched();
      return;
    }
    const especialidadData = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: form.precio
    }
    if(this.especialidadForm.controls.id.value > 0){
      this.service.modificarEspecialidad(form.id,especialidadData).subscribe({
        next: (response) => {
          Swal.fire({
            title: '!Registro Exitoso!',
            text: 'La especialidad ha agregada',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.especialidadForm.reset();
            this.router.navigate(['/inicio/admin/especialidades'])
          })
        },

      })

    }else{
      this.service.registrarEspecialidad(especialidadData).subscribe({
        next: (response) => {
          Swal.fire({
            title: '¡Registro Exitoso!',
            text: 'La especialidad ha sido registrado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.especialidadForm.reset();
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: err.error?.message || 'No se pudo registrar la especialidad',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      })
    }
  }

}
