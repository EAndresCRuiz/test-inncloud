import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../proyectos.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-proyectos',
  templateUrl: './lista-proyectos.component.html',
  styleUrls: ['./lista-proyectos.component.css']
})
export class ListaProyectosComponent implements OnInit {

  proyectos: any[] = [];

  constructor(
    private proyectosService: ProyectosService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.proyectosService.getProyectos().subscribe(
      (data: any[]) => {
        this.proyectos = data;
      },
      (error) => {
        console.error('Error al obtener los proyectos:', error);
      }
    );
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      this.proyectosService.deleteProyecto(id).subscribe(
        () => {
          this.snackBar.open('Proyecto eliminado con éxito', 'Cerrar', { duration: 3000 });
          this.cargarProyectos();
        },
        (error) => console.error('Error al eliminar el proyecto:', error)
      );
    }
  }

  onEdit(id: number): void {
    this.router.navigate(['/proyectos/editar', id]);
  }
}