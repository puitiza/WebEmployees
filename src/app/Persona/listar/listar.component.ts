import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';
import { Persona } from 'src/app/Model/Persona';
import { HttpErrorResponse } from '@angular/common/http';
import { HTTP } from 'src/app/Model/Contanst/HTTP';

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
  constructor(private service: ServiceService, private router: Router) { }

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

}
