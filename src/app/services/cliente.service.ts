import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Cliente } from '../models/cliente';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url_endpoint: string = "http://localhost:8080/api/";
  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient, private router: Router) { }

  getClientes():Observable<Cliente[]>{
    //return of(CLIENTES);
    return this.http.get<Cliente[]>(this.url_endpoint + "clientes");
  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.url_endpoint+ "clientes",cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el cliente.',
          text:  e.error.errors
        })
        return throwError( () => e );
      })
      );
  }

  getCliente(id:number): Observable<any>{
    return this.http.get<Cliente>(this.url_endpoint+ "clientes/"+id).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        Swal.fire({
          icon: 'error',
          title: 'Error al editar',
          text: e.error.message
        })
        return throwError( () => e );
      })
    );
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.url_endpoint+ "clientes/"+ cliente.id,cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'error',
          title: 'Error al editar el cliente.',
          text: e.error.message + e.error.errors
        })
        return throwError( () => e );
      })
    );
  }

  deleteCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(this.url_endpoint+ "clientes/"+ id, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar el cliente.',
          text: e.error.message
        })
        return throwError( () => e );
      })
    );
  }
}
