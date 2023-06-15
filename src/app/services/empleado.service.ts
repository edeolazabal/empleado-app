import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Empleado } from '../model/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  basePath = environment.basePath;

  constructor(private http: HttpClient) {}

  getEmpleados() {
    return this.http.get<Empleado[]>(this.basePath);
  }

  getEmpleadoId(id: any) {
    return this.http.get<Empleado>(`${this.basePath}/${id}`);
  }

  addEmpleado(empleado: Empleado) {
    return this.http.post<Empleado>(this.basePath, empleado);
  }

  updateEmpleado(id: any, empleado: Empleado) {
    return this.http.put<Empleado>(`${this.basePath}/${id}`, empleado);
  }

  delete(id: any) {
    return this.http.delete<Empleado>(`${this.basePath}/${id}`);
  }
}

