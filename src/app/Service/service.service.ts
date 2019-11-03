import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { persona } from '../Model/Persona';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  //Aqui definiré la url de mi proyecto
  //Url = 'http://localhost:8080/api/employees';
  Url = '/api/employees';


  //Este metodo obtendrá el listar de personas
  getPersonas(){
    return this.http.get<persona[]>(this.Url);
  }
}
