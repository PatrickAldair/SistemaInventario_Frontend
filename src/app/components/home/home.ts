import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router'; 
import { Producto } from '../../services/producto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink], 
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  
  totalProductos: number = 0;
  alertasStock: number = 0;
  totalUnidades: number = 0;
  categoriasActivas: number = 0;

  constructor(
    private productoService: Producto,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.totalProductos = data.length;
        this.alertasStock = data.filter((p: any) => p.cantidad < 20).length;
        this.totalUnidades = data.reduce((sum: number, p: any) => sum + p.cantidad, 0);
        const categorias = new Set(data.map((p: any) => p.categoria));
        this.categoriasActivas = categorias.size;

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar datos del Home', err)
    });
  }
}