import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Persona } from 'src/app/Model/Persona';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { HTTP } from 'src/app/Model/Contanst/HTTP';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  HTTP: typeof HTTP = HTTP;
  persona: Persona = new Persona();

  constructor(private router: Router, private service: ServiceService, private toastr: ToastrService) { }

  ngOnInit() { }

  onSubmit() {
    this.Guardar();
  }

  Guardar() {

    this.service.createPersona(this.persona)
      .subscribe(data => {
        this.toastr.success('', 'Guardado éxitosamente', {
          closeButton: true,
          positionClass: 'toast-top-full-width',
        });
        console.log(data);
        //this.router.navigate(["listar"]);
      }, error => {
        if (error instanceof HttpErrorResponse) {
          // const errorMessages = new Array<{ propName: string; errors: string }>();
          switch (error.status) {
            default:
              this.toastr.error('Se ha encontrado un problema al guardar la persona', 'No se puede guardar', {
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
