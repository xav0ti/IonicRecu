import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

nombre: string = "";
contrasenya :string = "";
usuario: {};
  constructor(private _db: AngularFireDatabase) { }

  ngOnInit() {
  }
insertarUsuario(){
  this.usuario = {
    "nombre":this.nombre,
    "contrasenya":this.contrasenya
  };
  let ref=this._db.database.ref("usuarios")
  let res = ref.push(this.usuario)
}
}
