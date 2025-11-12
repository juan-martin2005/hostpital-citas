import {Component, OnInit} from '@angular/core';
import { EspecialidadService } from '../../../core/services/especialidad/especialidad';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxPaginationModule } from "ngx-pagination";

interface EspecialidadEntity {
  id?: number;
  nombre?: string;
  descripcion?: string;
  precio?: number;
}

@Component({
  selector: 'app-especialidades',
  imports: [NgxPaginationModule],
  templateUrl: './especialidades.html',
  styleUrl: './especialidades.css'
})
export class Especialidades implements OnInit {

  isLoading = false;
  page!: number;

  constructor(private service: EspecialidadService, private router: Router){}
  especialidades: EspecialidadEntity[] = [];

  espSelect: EspecialidadEntity= {}

  ngOnInit(){
    this.cargarEspecialidades()
  }
  cargarEspecialidades(): void{
    this.isLoading = true;
    this.service.listarEspecialidades().subscribe({
      next: (response) => {
        this.especialidades = response;
        this.isLoading = false;
      }
    })
  }

  seleccionarEspecialidad(esp: EspecialidadEntity): void {
    this.router.navigate(['/inicio/admin/editar-especialidad', esp.id]);
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
