import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Producto } from '../../services/producto';

@Component({
  selector: 'app-form-producto',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './form-producto.html',
  styleUrls: ['./form-producto.css']
})
export class FormProducto {

  listaUbicaciones = [
    'Zona A - Rack Principal',
    'Zona B - Almacén Frío',
    'Pasillo 1 - Estantería Eléctrica',
    'Pasillo 2 - Herramientas',
    'Vitrina de Exhibición',
    'Caja Fuerte (Instrumentos)'
  ];

  nuevoProducto = {
    nombre: '',
    lote: '',
    cantidad: 0,
    ubicacion: '',
    categoria: ''
  };

  constructor(private router: Router, private productoService: Producto) {}

  guardarProducto() {
    this.productoService.crearProducto(this.nuevoProducto).subscribe({
      next: (res) => {
        alert('¡Producto guardado exitosamente en la Base de Datos!');
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        alert('Error al guardar el producto. Revisa la consola.');
        console.error(err);
      }
    });
  }
}