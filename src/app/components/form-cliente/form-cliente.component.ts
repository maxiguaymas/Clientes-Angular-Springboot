import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {

  cliente: Cliente = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    createAt: ''
  };
  constructor(private clienteService:ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  create(){
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe({
      next: (response) => {
        console.log(response,"cliente creado");
        this.router.navigate(['/clientes']);
        Swal.fire("Nuevo Cliente",`Cliente '${this.cliente.nombre}' creado con exito.`,'success');
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => console.log("cliente creado")
    })
  }

  cargarCliente(){
    this.activatedRoute.params.subscribe(
      params => {
        let id:number = params['id'];
        if(id){
          this.clienteService.getCliente(id).subscribe({
            next: (response) => {
              this.cliente = response;
            },
            error: (error) => {
              console.error(error);
            },
            complete: () => console.log("cliente obtenido")
          });
        }
      }
    );
  }

  update(){
    console.log(this.cliente);
    this.clienteService.updateCliente(this.cliente).subscribe({
      next: (response) => {
        console.log(response,"cliente editado");
        this.router.navigate(['/clientes']);
        Swal.fire("Cliente editado",`Cliente '${this.cliente.nombre}' editado con exito.`,'success');
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => console.log("cliente editado")
    })
  }

}
