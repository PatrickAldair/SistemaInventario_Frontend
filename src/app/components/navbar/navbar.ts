import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {

  constructor(public auth: Auth, private router: Router) {}

  cerrarSesion() {
    this.auth.logout(); 
    this.router.navigate(['/login']); 
  }
}