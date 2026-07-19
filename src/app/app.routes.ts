import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ListaProductos } from './components/lista-productos/lista-productos';
import { FormProducto } from './components/form-producto/form-producto';
import { Login } from './components/login/login';
import { Auditoria } from './components/auditoria/auditoria';
import { Registro } from './components/registro/registro'; 
import { authGuard, adminGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'productos', component: ListaProductos, canActivate: [authGuard] },
  { path: 'nuevo', component: FormProducto, canActivate: [authGuard] },
  { path: 'auditoria', component: Auditoria, canActivate: [adminGuard] },
  { path: 'registro', component: Registro, canActivate: [adminGuard] } 
];