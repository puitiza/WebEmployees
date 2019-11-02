import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebEmployees';

  //Crearé un constructor de enrutamiento
  constructor(private router:Router){}

  //Recuerda que el nombre que va dentro de navigate es el mismo definido en la clase app-routing.module.ts
  Listar(){
    this.router.navigate(["listar"]);
  }

  Nuevo(){
    this.router.navigate(["add"]);
  }
}
