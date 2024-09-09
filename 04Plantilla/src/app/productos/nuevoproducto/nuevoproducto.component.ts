import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IIva } from 'src/app/Interfaces/IIva';
import { Iproveedor } from 'src/app/Interfaces/iproveedor';
import { IUnidadMedida } from 'src/app/Interfaces/iunidadmedida';
import { IvaService } from 'src/app/Services/iva.service';
import { ProductoService } from 'src/app/Services/productos.service';
import { ProveedorService } from 'src/app/Services/proveedores.service';
import { UnidadmedidaService } from 'src/app/Services/unidadmedida.service';

@Component({
  selector: 'app-nuevoproducto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevoproducto.component.html',
  styleUrl: './nuevoproducto.component.scss'
})
export class NuevoproductoComponent implements OnInit {
  listaUnidadMedida: IUnidadMedida[] = [];
  listaProveedores: Iproveedor[] = [];
  listaIVA: IIva[] = [];
  titulo = '';
  frm_Producto: FormGroup;

  constructor(
    private uniadaServicio: UnidadmedidaService,
    private fb: FormBuilder,
    private proveedoreServicio: ProveedorService,
    private ivaServicio: IvaService,
    private productoServicio: ProductoService
  ) {}

  ngOnInit(): void {
    this.uniadaServicio.todos().subscribe((data) => (this.listaUnidadMedida = data));
    this.proveedoreServicio.todos().subscribe((data) => (this.listaProveedores = data));
    this.ivaServicio.todos().subscribe((data) => (this.listaIVA = data));

    this.crearFormulario();
  }

  crearFormulario() {
    this.frm_Producto = new FormGroup({
      Codigo_Barras: new FormControl('', Validators.required),
      Nombre_Producto: new FormControl('', Validators.required),
      Graba_IVA: new FormControl('', Validators.required),
      Unidad_Medida_idUnidad_Medida: new FormControl('', Validators.required),
      IVA_idIVA: new FormControl('', Validators.required),
      Cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
      Valor_Compra: new FormControl('', [Validators.required, Validators.min(0)]),
      Valor_Venta: new FormControl('', [Validators.required, Validators.min(0)]),
      Proveedores_idProveedores: new FormControl('', Validators.required)
    });
  }

  grabar() {
    if (this.frm_Producto.valid) {
      const producto = this.frm_Producto.value;

      this.productoServicio.insertar(producto).subscribe(
        (respuesta) => {
          console.log('Producto guardado con éxito:', respuesta);
          alert('Producto guardado con éxito.');
          this.frm_Producto.reset();
        },
        (error) => {
          console.error('Error al guardar el producto:', error);
          alert('Error al guardar el producto. Por favor, intenta nuevamente.');
        }
      );
    } else {
      console.log('Formulario no válido');
      alert('Por favor, completa el formulario correctamente.');
    }
  }
}
