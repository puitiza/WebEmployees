import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';
import { Persona } from 'src/app/Model/Persona';
import { HttpErrorResponse } from '@angular/common/http';
import { HTTP } from 'src/app/Model/Contanst/HTTP';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  personas: Persona[];
  status: number;
  HTTP: typeof HTTP = HTTP;
  // errorMessage : string;

  //(let persona of personas)->top declare variable "personas" that I'll use in html
  constructor(private service: ServiceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getPersonas()
      .subscribe(data => {
        this.personas = data;
        this.status = HTTP.OK;
        console.log('List of employees', data);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          // const errorMessages = new Array<{ propName: string; errors: string }>();
          switch (err.status) {
            case HTTP.NO_CONTENT:
                this.status = HTTP.NO_CONTENT;
              break;
            default:
              this.status = err.status;
              console.log('Error Message', err.message);
              break;
          }
        }
      })
  }

  Editar(persona:Persona):void{
    localStorage.setItem("id",persona.id.toString());
    this.router.navigate(["edit"]);
  }

  Eliminar(persona:Persona):void{
    this.service.deletePersona(persona)
    .subscribe(data =>{
      this.personas=this.personas.filter(p=> p!==persona);
      this.toastr.success('', 'Persona eliminada éxitosamente', {
        closeButton: true,
        positionClass: 'toast-top-full-width',
      });
    })
  }

}
