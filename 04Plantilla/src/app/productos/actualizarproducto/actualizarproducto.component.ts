import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../Services/productos.service';
import Swal from 'sweetalert2';
import { IProducto } from '../../Interfaces/iproducto';
import { IUnidadMedida } from '../../Interfaces/iunidadmedida';
import { IIVA } from '../../Interfaces/iiva';
import { IProveedor } from '../../Interfaces/iproveedor';
import { UnidadmedidaService } from '../../Services/unidadmedida.service';
import { ProveedorService } from '../../Services/proveedores.service';
import { IvaService } from '../../Services/iva.service';

@Component({
  selector: 'app-editarproducto',
  templateUrl: './editarproducto.component.html',
  styleUrls: ['./editarproducto.component.scss']
})
export class EditarProductoComponent implements OnInit {
  frm_Producto: FormGroup;
  titulo = 'Editar Producto';
  productoId: number;
  listaUnidadMedida: IUnidadMedida[] = [];
  listaIVA: IIVA[] = [];
  listaProveedores: IProveedor[] = [];

  constructor(
    private fb: FormBuilder,
    private productoServicio: ProductoService,
    private route: ActivatedRoute,
    private router: Router,

    private uniadaServicio: UnidadmedidaService,
    private proveedoreServicio: ProveedorService,
    private ivaServicio: IvaService
  ) {}

  ngOnInit(): void {

    this.productoId = Number(this.route.snapshot.paramMap.get('id'));

    this.iniciarFormulario();
    this.cargarDatos();
    this.cargarListas();
  }

  iniciarFormulario() {
    this.frm_Producto = this.fb.group({
      Codigo_Barras: ['', Validators.required],
      Nombre_Producto: ['', Validators.required],
      Graba_IVA: ['1'],
      Unidad_Medida_idUnidad_Medida: ['', Validators.required],
      IVA_idIVA: ['', Validators.required],
      Cantidad: [0, [Validators.required, Validators.min(1)]],
      Valor_Compra: [0, [Validators.required, Validators.min(0)]],
      Valor_Venta: [0, [Validators.required, Validators.min(0)]],
      Proveedores_idProveedores: ['', Validators.required]
    });
  }

  cargarDatos() {
    this.productoServicio.uno(this.productoId).subscribe((producto: IProducto) => {
      this.frm_Producto.patchValue(producto);
    });
  }

  cargarListas() {
    this.uniadaServicio.todos().subscribe((data) => (this.listaUnidadMedida = data));
    this.proveedoreServicio.todos().subscribe((data) => (this.listaProveedores = data));
    this.ivaServicio.todos().subscribe((data) => (this.listaIVA = data));
  }

  grabar() {
    if (this.frm_Producto.valid) {
      this.productoServicio.actualizar(this.productoId, this.frm_Producto.value).subscribe(() => {
        Swal.fire('Actualizado', 'El producto ha sido actualizado', 'success').then(() => {
          this.router.navigate(['/productos']);
        });
      }, () => {
        Swal.fire('Error', 'Ocurrió un error al actualizar el producto', 'error');
      });
    }
  }
}
