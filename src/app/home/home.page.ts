import { Component } from '@angular/core';
import { IProductoTec, IProductoHog, IProductoInm, IProductoMot, IProductoKey } from './interfaces';
import { ToastController } from '@ionic/angular';
import { listaproductosservices } from '../services/listaproductos.services';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  

  option: string = "";  //Aquí guardamos la info de la opción elegida en el checklist.


  //Variable para guardar la id del USUARIO.
  id: string;

  oculto: boolean = true; //Manejamos el estado del botón para mostras u ocultar los productos en una lista.

   //Variable donde guardamos todos los objetos(Productos) para posteriormente mostrarlos o acceder a ellos.
   producto: (IProductoHog | IProductoTec | IProductoInm | IProductoMot | IProductoKey)[] = [];



  //Hay que llamar en el constructor, para poder utilizar los imports hechos arriba
  constructor(private _toastCtrl: ToastController, private _listaProductos: listaproductosservices, private route: Router) {
    
  }


  ngOnInit() {

    //Código AE11//
    this.id = "ljnPl9ZGPhgZ1QLa5PIQKf5Mfc62"; //Hardcodeamos la id del USUARIO para saber el Login


    //Código AE9//
    //Se guarda en la variable de arriba 'producto' todos los productos que existen, están guardados en listaproductos.services.ts
    //this.producto = this._listaProductos.getListasProductos();

    //Código AE10//
    let ref = this._listaProductos.getListasProductos();  //Coge los productoS de la bbdd
    ref.once("value", snapshot => {
      snapshot.forEach(child => {
        let value = child.val();  //Recoge los valores de cada subNodo
        value.key = child.key;  //Esto es para recoger la key
        this.producto.push(value);  //Inserta en el objeto producto el value recogido antes
      })
    })
    
  }


    //Controlar el estado del botón y así poder mostrar o no la lista de productos.
    cambiarOculto() : void{
      this.oculto = !this.oculto;
    }

}
