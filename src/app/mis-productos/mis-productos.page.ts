import { Component, OnInit } from '@angular/core';
import { listaproductosservices } from '../services/listaproductos.services';
import { AngularFireDatabase } from '@angular/fire/database'    //Para poder usar la bbdd aquí.
import { ActivatedRoute } from '@angular/router';
import { IProductoTec, IProductoHog, IProductoInm, IProductoMot, IProductoKey } from '../home/interfaces';

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.page.html',
  styleUrls: ['./mis-productos.page.scss'],
})
export class MisProductosPage implements OnInit {

  keyUsuario: string; //Aqui guardamos la key del USUARIO para acceder a los productos de ESE USUARIO
  producto: (IProductoHog | IProductoTec | IProductoInm | IProductoMot | IProductoKey)[] = [];
  option: string = "";  //Aquí guardamos la info de la opción elegida en el checklist de la AE8
  

  constructor(private _activatedRoute: ActivatedRoute, private _listaProductos: listaproductosservices) { }

  //Recuperamos los productos del usuario con la misma key
  ngOnInit() {
    this.keyUsuario = "ljnPl9ZGPhgZ1QLa5PIQKf5Mfc62"; //Hardcodeamos la key del USUARIO
    let ref = this._listaProductos.getListasProductos();  //Recupero todos los productos de la bbdd
    ref.orderByChild("claveUsuario").equalTo(this.keyUsuario).once("value", snapshot => {
      //Ordena en el subNODO productos por "claveusuario" y recoge los que sean igual a la this.keyUsuario
      snapshot.forEach(child => {
        this.producto.push(child.val());  //Por cada producto de arriba, mételos en la variable producto.
      })
    })

    //orderByChild: entra en el nodo hijo del nodo Productos que tenga en el nombre "claveUsuario"
    //el valor de this.keyUsuario

  }

  //Se le pasa el id del PRODUCTO que seleccionamos
  eliminarProducto(id){
    let ref = this._listaProductos.getProducto(id); //Se accede al método que recoge UNO solo.
    ref.remove(); //Lo elimina
  }

}
