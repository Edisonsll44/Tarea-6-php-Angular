import { Component, OnInit } from '@angular/core';
import { IUnidadMedida } from '../Interfaces/iunidadmedida';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';
import { UnidadmedidaService } from '../Services/unidadmedida.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unidadmedida',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './unidadmedida.component.html',
  styleUrls: ['./unidadmedida.component.scss'] // Nota: Aquí debería ser styleUrls en lugar de styleUrl
})
export class UnidadmedidaComponent implements OnInit {
  listaunidades: IUnidadMedida[] = [];

  constructor(
    private unidadServicio: UnidadmedidaService,
    private router: Router // Agregar el Router para redirección
  ) {}

  ngOnInit(): void {
    this.cargarUnidades();
  }

  cargarUnidades() {
    this.unidadServicio.todos().subscribe((data) => {
      this.listaunidades = data;
    });
  }

  eliminar(idUnidad_Medida: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta unidad de medida?')) {
      this.unidadServicio.eliminar(idUnidad_Medida).subscribe(
        (response) => {
          if (response > 0) { // Suponiendo que la respuesta es un código de estado
            alert('Unidad de medida eliminada exitosamente');
            this.cargarUnidades(); // Recargar la lista de unidades
          } else {
            alert('Error al eliminar la unidad de medida');
          }
        },
        (error) => {
          console.error('Error al eliminar la unidad de medida', error);
          alert('Error al eliminar la unidad de medida');
        }
      );
    }
  }

  actualizar(idUnidad_Medida: number) {
    this.router.navigate(['/editarunidadmedida', idUnidad_Medida]);
  }
}
