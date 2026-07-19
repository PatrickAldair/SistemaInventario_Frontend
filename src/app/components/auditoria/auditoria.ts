import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditoriaService } from '../../services/auditoria';

@Component({
  selector: 'app-auditoria',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './auditoria.html',
  styleUrls: ['./auditoria.css']
})
export class Auditoria implements OnInit {
  movimientos: any[] = [];

  constructor(
    private auditoriaService: AuditoriaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarHistorial();
  }

  cargarHistorial() {
    this.auditoriaService.getHistorial().subscribe({
      next: (data) => {
        this.movimientos = data;
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Error al cargar la auditoría', err)
    });
  }
}