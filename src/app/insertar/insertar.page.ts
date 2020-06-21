import { Component, OnInit } from '@angular/core';
import { IProductoTec, IProductoHog, IProductoInm, IProductoMot } from '../home/interfaces';
import { ToastController } from '@ionic/angular';
import { listaproductosservices } from '../services/listaproductos.services';
import { AngularFireDatabase } from '@angular/fire/database'    //Para poder usar la bbdd aquí.
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-insertar',
  templateUrl: './insertar.page.html',
  styleUrls: ['./insertar.page.scss'],
})
export class InsertarPage implements OnInit {


  
  //Código para controlar que muestre la imagen
  categoriaTec: String="Tecnología";
  categoriaHog: String="Hogar";
  categoriaInm: String="Inmobiliaria";
  categoriaMot: String="Motor";

  tecSelec: Boolean=true;
  hogSelec: Boolean=false;
  inmSelec: Boolean=false;
  motSelec: Boolean=false;

  urlImagen: String="";

  urlTec: String="../../assets/images/tecnologia.jpg";
  urlHog: String="../../assets/images/hogar.jpeg";
  urlInm: String="../../assets/images/inmobiliaria.jpeg";
  urlMot: String="../../assets/images/motor.jpeg";



  //Datos a rellenar por el usuario
  id: string = "";
  nombre: string = "";
  descripcion: string = "";
  precio: number = 0;
  estado: string = "";
  km: number = 0;
  anyo: number = 0;
  localidad: string = "";
  metros: number = 0;
  habitaciones: number = 0;
  banyos: number = 0;
  claveUsuario: string = "";
  categoria: string;


  

  option: string = "";  //Aquí guardamos la info de la opción elegida en el checklist de la AE8



  //Variable donde guardamos todos los objetos(Productos) para posteriormente mostrarlos o acceder a ellos.
  producto: (IProductoHog | IProductoTec | IProductoInm | IProductoMot)[];



  constructor(private _toastCtrl: ToastController, private _listaProductos: listaproductosservices, private _db: AngularFireDatabase, private _activatedRoute: ActivatedRoute) {
    
  }

  ngOnInit() {
  }



  async presentToast() {  //Muestra el mensaje 'message' en el momento de ser creado. Se utiliza siendo llamado.
    const toast = await this._toastCtrl.create({
      message: 'El producto se ha insertado correctamente',
      duration: 1000,
      position: "bottom"
    });
    toast.present();
  }

//Método para RECUPERA y AÑADE al campo id, la clave generada automáticamente
actualizarClave(clave: string){
  let ref = this._db.database.ref("productos/"+clave+"/id");
  ref.set(clave);
}




    //Método para INSERTAR un producto TECNOLÓGICO
    insertarTec(){
      let productoTec: IProductoTec={
                                      "id": this.id,
                                      "nombre": this.nombre,
                                      "descripcion": this.descripcion,
                                      "estado": this.estado,
                                      "precio": this.precio,
                                      "claveUsuario": this._activatedRoute.snapshot.paramMap.get("id"),
                                      "categoria": this.categoria                
                                    };

      //Código AE8//                              
      //this.producto.push(productoTec);

      //Código AE10//
      //Llamamos a la función que añade producto tecnologico en la bbdd de FireBase. Le pasamos el producto por parametro.
      let clave: string = this._listaProductos.setProducto(productoTec);
      this.actualizarClave(clave);
      this.presentToast();  //Se llama para que muestre el mensaje de que ha sido insertado un producto.
    }




    //Método para INSERTAR un producto HOME
    insertarHom(){
      let productoHog: IProductoHog={
                                      "id": this.id,
                                      "nombre": this.nombre,
                                      "descripcion": this.descripcion,
                                      "precio": this.precio,
                                      "claveUsuario": this._activatedRoute.snapshot.paramMap.get("id"),
                                      "categoria": this.categoria
                                    };

      //Código AE8// 
      //this.producto.push(productoHog);

      //Código AE10//
      //Llamamos a la función que añade producto Hogar en la bbdd de FireBase. Le pasamos el producto por parametro.
      let clave: string = this._listaProductos.setProducto(productoHog);
      this.actualizarClave(clave);
      this.presentToast();
    }



    //Método para INSERTAR un producto INMOBILIARIA
    insertarInm(){
      let productoInm: IProductoInm={
                                      "id": this.id,
                                      "nombre": this.nombre,
                                      "descripcion": this.descripcion,
                                      "estado": this.estado,
                                      "localidad": this.localidad,
                                      "metros": this.metros,
                                      "habitaciones": this.habitaciones,
                                      "banyos": this.banyos,
                                      "precio": this.precio,
                                      "claveUsuario": this._activatedRoute.snapshot.paramMap.get("id"),
                                      "categoria": this.categoria
                                  };
      //Código AE8//                             
      //this.producto.push(productoInm);

      //Código AE10//
      //Llamamos a la función que añade producto Inmobiliaria en la bbdd de FireBase. Le pasamos el producto por parametro.
      let clave: string = this._listaProductos.setProducto(productoInm);
      this.actualizarClave(clave);
      this.presentToast();
    }



    //Método para INSERTAR un producto MOTOR
    insertarMot(){
      let productoMot: IProductoMot={
                                      "id": this.id,
                                      "nombre": this.nombre,
                                      "descripcion": this.descripcion,
                                      "estado": this.estado,
                                      "km": this.km,
                                      "anyo": this.anyo,
                                      "precio": this.precio,
                                      "claveUsuario": this._activatedRoute.snapshot.paramMap.get("id"),
                                      "categoria": this.categoria
                                  };
      //Código AE8// 
      //this.producto.push(productoMot);

      //Código AE10//
      //Llamamos a la función que añade producto Motor en la bbdd de FireBase. Le pasamos el producto por parametro.
      let clave: string = this._listaProductos.setProducto(productoMot);
      this.actualizarClave(clave);
      this.presentToast();
    }




    //Método para dejar en blanco las casillas, una vez que el usuario ha registrado un producto.
    restauraDatos(){
      this.nombre = "";
      this.descripcion = "";
      this.precio = 0;
      this.estado= "";
      this.km = 0;
      this.anyo= 0;
      this.localidad = "";
      this.metros = 0;
      this.habitaciones = 0;
      this.banyos = 0;
    }



    //Dependiendo de que boolean este activo asigna la url de la imagen correspondiente a la variable URLIMAGEN
   MuestraImagenCategoria(){
    if (this.option == 'T') {
      this.urlImagen = this.urlTec;
    }else if (this.option == 'H') {
                  this.urlImagen = this.urlHog;
          }else if (this.option == 'I') {
                      this.urlImagen = this.urlInm;
                  }else if (this.option == 'M') {
                    this.urlImagen = this.urlMot;
                  }
  }











}
