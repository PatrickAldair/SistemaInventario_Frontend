import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  credenciales = { username: '', password: '' };
  mensajeError = '';

  constructor(private authService: Auth, private router: Router) {}

  iniciarSesion() {
    this.authService.login(this.credenciales).subscribe({
      next: (res) => {
        this.router.navigate(['/home']); 
      },
      error: (err) => {
        this.mensajeError = 'Usuario o contraseña incorrectos';
      }
    });
  }
}