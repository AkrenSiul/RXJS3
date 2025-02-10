import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Juguete} from '../common/juguete-interface';
import {Cosmetico} from '../common/cosmeticos-interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  carritoJuguete: BehaviorSubject<Juguete[]> = new BehaviorSubject<Juguete[]>([]);
  cantidadCarrito: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  precioCarrito: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  carritoCosmetico: BehaviorSubject<Cosmetico[]> = new BehaviorSubject<Cosmetico[]>([]);

  constructor() { }

  addToCartJuguete(juguete: Juguete){
    var carritoAux = this.carritoJuguete.value;
    var carritoAux2 = this.carritoCosmetico.value;
    var precioCarrito = this.precioCarrito.value;
    carritoAux.push(juguete);
    this.carritoJuguete.next(carritoAux);
    this.cantidadCarrito.next(carritoAux.length + carritoAux2.length)
    precioCarrito+=juguete.precio;
    this.precioCarrito.next(precioCarrito);
  }
  addToCartCosmetico(cosmetico: Cosmetico) {
    var carritoAux = this.carritoCosmetico.value;
    var carritoAux2 = this.carritoJuguete.value;
    var precioCarrito = this.precioCarrito.value;
    carritoAux.push(cosmetico);
    this.carritoCosmetico.next(carritoAux);
    this.cantidadCarrito.next(carritoAux.length + carritoAux2.length);
    precioCarrito+=cosmetico.price;
    this.precioCarrito.next(precioCarrito);
  }
}
