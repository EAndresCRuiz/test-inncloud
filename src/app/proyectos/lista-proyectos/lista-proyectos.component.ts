import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../proyectos.service';

@Component({
  selector: 'app-lista-proyectos',
  templateUrl: './lista-proyectos.component.html',
  styleUrls: ['./lista-proyectos.component.css']
})
export class ListaProyectosComponent implements OnInit {

  proyectos: any[] = [];

  constructor(private proyectosService: ProyectosService) { }

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
}