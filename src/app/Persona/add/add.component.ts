import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Persona } from 'src/app/Model/Persona';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  persona: Persona = new Persona();

  constructor(private router: Router, private service: ServiceService) { }

  ngOnInit() {}

  onSubmit() {
    this.Guardar();    
  }

  Guardar() {

    this.service.createPersona(this.persona)
      .subscribe(data => {
        alert("Se Agrego con Exito ...!!!");
        console.log(data);
        this.router.navigate(["listar"]);
      }, error => console.log(error) )
  }

}
