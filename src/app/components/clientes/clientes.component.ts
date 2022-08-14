import { Component, OnInit } from '@angular/core';

import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes!: Cliente[];
    
  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    
    this.clienteService.getClientes().subscribe({
      next: (response) => {
        this.clientes = response;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => console.log("La peticion se ha completado")
    });

  }

  delete(cliente: Cliente){
    Swal.fire({
      title: 'Estas seguro?',
      text: `¿Deseas eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(cliente.id).subscribe({
          next: (response) => {
            console.log("cliente eliminado", response);
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.log("La peticion se ha completado")
        });
        window.location.reload();
        Swal.fire(
          'Cliente eliminado!',
          'El cliente ha sido eliminado.',
          'success'
        );
      }
    })
  }

}
