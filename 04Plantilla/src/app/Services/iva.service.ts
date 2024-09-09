import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIva } from '../Interfaces/IIva';

@Injectable({
  providedIn: 'root'
})
export class IvaService {
  apiurl = 'http://localhost/sexto/Proyectos/03MVC/controllers/iva.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<IIva[]> {
    return this.lector.get<IIva[]>(this.apiurl + 'todos');
  }

  uno(idIva: number): Observable<IIva> {
    const formData = new FormData();
    formData.append('idIva', idIva.toString());
    return this.lector.post<IIva>(this.apiurl + 'uno', formData);
  }

  eliminar(idIva: number): Observable<number> {
    const formData = new FormData();
    formData.append('idIva', idIva.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(unidad: IIva): Observable<string> {
    const formData = new FormData();
    formData.append('Detalle', unidad.Detalle);
    formData.append('Estado', unidad.Estado.toString());
    formData.append('Estado', unidad.Valor.toString());
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(unidad: IIva): Observable<string> {
    const formData = new FormData();
    formData.append('idIva', unidad.idIva.toString());
    formData.append('Detalle', unidad.Detalle);
    formData.append('Estado', unidad.Estado.toString());
    formData.append('Estado', unidad.Valor.toString());
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
