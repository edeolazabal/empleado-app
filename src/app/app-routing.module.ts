import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEmpleadosComponent } from './components/lista-empleados/lista-empleados.component';
import { RegistrarEmpleadoComponent } from './components/registrar-empleado/registrar-empleado.component';

const routes: Routes = [
  { path: 'listaEmpleados', component: ListaEmpleadosComponent },
  { path: 'addEmpleado', component: RegistrarEmpleadoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
