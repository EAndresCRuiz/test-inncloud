import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasService } from '../tareas.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css']
})
export class CrearTareaComponent implements OnInit {

  tareaForm: FormGroup;
  idUsuario?: number;
  idTarea?: number;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private tareasService: TareasService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.tareaForm = this.fb.group({
      title: ['', Validators.required],
      completed: [false]
    });
  }

  ngOnInit(): void {
    this.idUsuario = +this.route.snapshot.params['idUsuario'];
    this.idTarea = +this.route.snapshot.params['idTarea'];

    if (this.idTarea) {
      this.tareasService.getTareaById(this.idTarea).subscribe(
        (tarea) => {
          this.tareaForm.patchValue({
            title: tarea.title,
            completed: tarea.completed
          });
        },
        (error) => console.error('Error al obtener la tarea:', error)
      );
    }
  }

  onSubmit(): void {
    if (this.tareaForm.invalid) {
      return;
    }

    const tareaData = {
      userId: this.idUsuario!,
      title: this.tareaForm.value.title,
      completed: this.tareaForm.value.completed
    };

    if (this.idTarea) {
      this.tareasService.updateTarea(this.idTarea, tareaData).subscribe(
        () => {
          this.snackBar.open('Tarea actualizada con éxito', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/tareas', this.idUsuario]);
        },
        (error) => console.error('Error al actualizar la tarea:', error)
      );
    } else {
      this.tareasService.createTarea(tareaData).subscribe(
        () => {
          this.snackBar.open('Tarea creada con éxito', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/tareas', this.idUsuario]);
        },
        (error) => console.error('Error al crear la tarea:', error)
      );
    }
  }
}