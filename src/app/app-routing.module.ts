import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FormClienteComponent } from './components/form-cliente/form-cliente.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full'
  },
  {
    path: 'clientes',
    component: ClientesComponent
  },
  {
    path: 'clientes/crear',
    component: FormClienteComponent
  },
  {
    path: 'clientes/crear/:id',
    component: FormClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
