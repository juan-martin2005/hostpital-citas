import { Component } from '@angular/core';
import { EspecialidadService } from '../../../core/services/especialidad/especialidad';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface EspecialidadEntity {
  id?: number;
  nombre?: string;
  descripcion?: string;
}

@Component({
  selector: 'app-especialidades',
  imports: [],
  templateUrl: './especialidades.html',
  styleUrl: './especialidades.css'
})
export class Especialidades {

  constructor(private service: EspecialidadService, private router: Router){}
  especialidades: EspecialidadEntity[] = [];

  espSelect: EspecialidadEntity= {}

  ngOnInit(){
    this.cargarEspecialidades()
  }
  cargarEspecialidades(): void{
    this.service.listarEspecialidades().subscribe({
      next: (response) => {
        this.especialidades = response;
      }
    })
  }

  seleccionarEspecialidad(esp: EspecialidadEntity): void{
    this.router.navigate(['/inicio/admin/nueva-especialidad'],{queryParams:{id:esp.id}})
  }

  eliminarEspecialidad(id : any): void{
    Swal.fire({
          title:"¿Quiere eliminar esta especialidad?",
          text:`La especialidad que se va eliminar tiene el id: ${id}`,
          icon:"warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Eliminar",
          cancelButtonText: "Cancelar"
        }).then(result=>{
          if(result.isConfirmed){
            this.service.eliminarEspecialidad(id).subscribe({
              next: (response) => {
                this.cargarEspecialidades();
              },
              error: (err) => {
                const errorMessage = err.error?.message ;
                Swal.fire({
                  title: 'Error a la hora de eliminar la especialidad',
                  text: errorMessage,
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            })
          }
        })

      }
      }
