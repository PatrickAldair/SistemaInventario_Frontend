import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class Registro {
  nuevoUsuario = { username: '', password: '' };
  mensajeExito = '';
  mensajeError = '';

  constructor(private http: HttpClient, private router: Router) {}

  registrar() {
    this.mensajeExito = '';
    this.mensajeError = '';

    this.http.post('https://sistemainventario-backend-1.onrender.com/api/usuarios/trabajadores', this.nuevoUsuario).subscribe({
      next: (res) => {
        this.mensajeExito = '¡Trabajador registrado exitosamente!';
        this.nuevoUsuario = { username: '', password: '' }; 
      },
      error: (err) => {
        this.mensajeError = 'Error al registrar. Es posible que el usuario ya exista.';
      }
    });
  }
}