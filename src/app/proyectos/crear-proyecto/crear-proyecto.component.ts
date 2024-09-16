import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from '../proyectos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {

  proyectoForm: FormGroup;
  id: number | null = null;  // ID del proyecto si estamos en modo edición

  constructor(
    private fb: FormBuilder,
    private proyectosService: ProyectosService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.proyectoForm = this.fb.group({
      name: ['', Validators.required],
      catchPhrase: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Comprobar si estamos editando un proyecto (si hay un ID en la ruta)
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.proyectosService.getProyectoById(this.id).subscribe(
        (proyecto) => {
          this.proyectoForm.patchValue({
            name: proyecto.name,
            catchPhrase: proyecto.company.catchPhrase
          });
        },
        (error) => {
          console.error('Error al obtener el proyecto:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.proyectoForm.invalid) {
      return;
    }

    const proyectoData = {
      name: this.proyectoForm.value.name,
      company: { catchPhrase: this.proyectoForm.value.catchPhrase }
    };

    if (this.id) {
      this.proyectosService.updateProyecto(this.id, proyectoData).subscribe(
        () => {
          this.snackBar.open('Proyecto actualizado con éxito', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/proyectos']);
        },
        (error) => console.error('Error al actualizar el proyecto:', error)
      );
    } else {
      this.proyectosService.createProyecto(proyectoData).subscribe(
        () => {
          this.snackBar.open('Proyecto creado con éxito', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/proyectos']);
        },
        (error) => console.error('Error al crear el proyecto:', error)
      );
    }
  }
}
