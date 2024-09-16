import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../proyectos.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

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
    private snackBar: MatSnackBar,
    private dialog: MatDialog
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: '¿Estás seguro de que deseas eliminar este proyecto?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.proyectosService.deleteProyecto(id).subscribe(
          () => {
            this.snackBar.open('Proyecto eliminado con éxito', 'Cerrar', { duration: 3000 });
            this.cargarProyectos();
          },
          (error) => console.error('Error al eliminar el proyecto:', error)
        );
      }
    });
  }

  onEdit(id: number): void {
    this.router.navigate(['/proyectos/editar', id]);
  }

  verTareas(idUsuario: number): void {
    this.router.navigate(['/tareas', idUsuario]);
  }
}