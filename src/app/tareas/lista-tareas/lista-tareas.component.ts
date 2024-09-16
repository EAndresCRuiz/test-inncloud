import { Component, OnInit } from '@angular/core';
import { TareasService } from '../tareas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.css']
})
export class ListaTareasComponent implements OnInit {

  tareas: any[] = [];
  idUsuario: number = 0;

  constructor(
    private tareasService: TareasService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.params['idUsuario'];
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.tareasService.getTareasByUserId(this.idUsuario).subscribe(
      (data: any[]) => this.tareas = data,
      (error) => console.error('Error al obtener las tareas:', error)
    );
  }

  onCreate(id: number): void {
    this.router.navigate(['/tareas/crear', id]);
  }

  onEdit(id: number): void {
    this.router.navigate(['/tareas/editar', id]);
  }

  onDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: '¿Estás seguro de que deseas eliminar esta tarea?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tareasService.deleteTarea(id).subscribe(
          () => {
            this.snackBar.open('Tarea eliminada con éxito', 'Cerrar', { duration: 3000 });
            this.cargarTareas();
          },
          (error) => console.error('Error al eliminar la tarea:', error)
        );
      }
    });
  }
}