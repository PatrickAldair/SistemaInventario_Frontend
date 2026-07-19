import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Producto } from '../../services/producto';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './lista-productos.html',
  styleUrls: ['./lista-productos.css']
})
export class ListaProductos implements OnInit {
  categoriaSeleccionada: string = '';
  productos: any[] = [];

  // Lista de ubicaciones EXACTAMENTE igual a la del formulario de ingreso
  listaUbicaciones = [
    'Zona A - Rack Principal',
    'Zona B - Almacén Frío',
    'Pasillo 1 - Estantería Eléctrica',
    'Pasillo 2 - Herramientas',
    'Vitrina de Exhibición',
    'Caja Fuerte (Instrumentos)'
  ];

  // Variables para controlar los modales
  mostrarModalTraslado = false;
  mostrarModalStock = false;
  productoSeleccionado: any = null;
  mensajeExitoModal = '';

  // Variables para los formularios de los modales
  nuevaUbicacion = '';
  nuevoStock = 0;

  constructor(
    private productoService: Producto,
    private cdr: ChangeDetectorRef,
    public auth: Auth
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Error cargando productos', err)
    });
  }

  get productosFiltrados() {
    if (!this.categoriaSeleccionada) {
      return this.productos;
    }
    return this.productos.filter(p => p.categoria === this.categoriaSeleccionada);
  }

  // --- LÓGICA DE MODALES ---

  cerrarModales() {
    this.mostrarModalTraslado = false;
    this.mostrarModalStock = false;
    this.productoSeleccionado = null;
    this.mensajeExitoModal = '';
  }

  // 1. MODAL TRASLADO
  abrirModalTraslado(producto: any) {
    this.productoSeleccionado = producto;
    this.nuevaUbicacion = producto.ubicacion; // Selecciona por defecto la actual
    this.mensajeExitoModal = '';
    this.mostrarModalTraslado = true;
  }

  confirmarTraslado() {
    this.productoService.moverProducto(this.productoSeleccionado.id, this.nuevaUbicacion).subscribe({
      next: () => {
        this.mensajeExitoModal = '¡Traslado exitoso!';
        // Esperamos 1.5 segundos para que el usuario lea el mensaje y cerramos
        setTimeout(() => {
          this.cerrarModales();
          this.cargarProductos();
        }, 1500);
      },
      error: (err) => console.error('Error al trasladar', err)
    });
  }

  // 2. MODAL STOCK (Solo Admin)
  abrirModalStock(producto: any) {
    this.productoSeleccionado = producto;
    this.nuevoStock = producto.cantidad; // Muestra el stock actual en el input
    this.mensajeExitoModal = '';
    this.mostrarModalStock = true;
  }

  confirmarStock() {
    if (this.nuevoStock < 0 || this.nuevoStock === null) {
      alert('Ingrese una cantidad válida.');
      return;
    }

    this.productoService.corregirStock(this.productoSeleccionado.id, this.nuevoStock).subscribe({
      next: () => {
        this.mensajeExitoModal = '¡Stock actualizado correctamente!';
        setTimeout(() => {
          this.cerrarModales();
          this.cargarProductos();
        }, 1500);
      },
      error: (err) => console.error('Error al corregir el stock', err)
    });
  }

  // --- ELIMINAR ---
  eliminar(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este material?')) {
      this.productoService.eliminarProducto(id).subscribe({
        next: () => {
          this.cargarProductos();
        },
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }
}