//Aquí se definen el formato que tienen los diferentes objetos(Producto) que luego se usarán en los distintos ficheros
//Hay que exportar para que luego se puedan importar allá donde se necesite.
export interface IProductoHog{
    "id": string,
    "nombre": string,
    "descripcion": string,
    "precio": number,
    "claveUsuario": string,
    "categoria": string
}

export interface IProductoTec extends IProductoHog{ //Extends IProductoHog significa que hereda los atributos de este, por lo que no hay que repetirlos.
    "estado": string,
}


export interface IProductoInm extends IProductoHog{
    "localidad": string,
    "estado": string,
    "metros": number,
    "habitaciones": number,
    "banyos": number
}


export interface IProductoMot extends IProductoHog{
    "estado": string,
    "km": number,
    "anyo": number
}

export interface IProductoKey extends IProductoHog{
    "key": string,
}