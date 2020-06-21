import { Component, OnInit } from '@angular/core';
import { listaproductosservices } from '../services/listaproductos.services';
import { ActivatedRoute } from '@angular/router';
import { IProductoTec, IProductoHog, IProductoInm, IProductoMot, IProductoKey } from '../home/interfaces';

@Component({
  selector: 'app-mas-detalles',
  templateUrl: './mas-detalles.page.html',
  styleUrls: ['./mas-detalles.page.scss'],
})
export class MasDetallesPage implements OnInit {

  key: string;

  constructor(private _service: listaproductosservices, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.key = this._activatedRoute.snapshot.paramMap.get("key"); //Recupera el parametro key de la URL
    let ref = this._service.getListasProductos(); //Accede a los productos de la bbdd
    ref.orderByKey().equalTo(this.key).once("value", snapshot => {  //Ordena todos los productos recuperados
      //de la bbdd por la key automática, y la compara con key recuperada de la URL.
      snapshot.forEach(child => { //Por cada uno, lo inserta en el objeto producto
        this.producto.push(child.val());
      });
    }
    );
  }


  producto: (IProductoHog | IProductoTec | IProductoInm | IProductoMot | IProductoKey)[] = [];

}
