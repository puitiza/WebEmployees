import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Persona } from 'src/app/Model/Persona';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  persona: Persona = new Persona();
  constructor(private router: Router, private service: ServiceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.Editar();
  }

  Editar() {
    let id = localStorage.getItem("id");
    this.service.findPersonaById(+id)
    .subscribe(data =>{
      this.persona = data;
    })
  }

  Actualizar(persona:Persona){
    this.service.updatePersona(persona)
    .subscribe(data =>{
      this.persona = data;
      this.toastr.success('', 'Actualizado éxitosamente', {
        closeButton: true,
        positionClass: 'toast-top-full-width',
      });
      console.log(data);
    }, error => {
      if (error instanceof HttpErrorResponse) {
        // const errorMessages = new Array<{ propName: string; errors: string }>();
        switch (error.status) {
          default:
            this.toastr.error('Se ha encontrado un problema al actualizar la persona', 'No se puede actualizar', {
              closeButton: true,
              positionClass: 'toast-top-full-width',
            });
            console.log('Error Message', error.message);
            break;
        }
      }
    })
  }

}
