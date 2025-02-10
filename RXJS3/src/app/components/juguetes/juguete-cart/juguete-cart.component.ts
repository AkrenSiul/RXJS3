import {Component, inject} from '@angular/core';
import {Juguete} from '../../../common/juguete-interface';
import {Cosmetico} from '../../../common/cosmeticos-interface';
import {CartService} from '../../../services/cart.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-juguete-cart',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './juguete-cart.component.html',
  styleUrl: './juguete-cart.component.css'
})
export class JugueteCartComponent {
  private readonly cartService: CartService = inject(CartService);
  jugueteList: Juguete[] = [];
  cosmeticoList: Cosmetico[] = [];
  totalPrice = 0;

  constructor() {
    this.loadJuguetes();
    this.loadCosmeticos();
    this.getTotalPrice();
  }


  private loadJuguetes() {
    this.cartService.carritoJuguete.subscribe(
      {
        next: value => {
          this.jugueteList = value;
        },
        complete: () => {
          console.log('Juguete traído')
        },
        error: err => {
          console.log(err.message);
        }
      }
    )

  }

  private loadCosmeticos() {
    this.cartService.carritoCosmetico.subscribe(
      {
        next: value => {
          this.cosmeticoList = value;
        },
        complete: () => {
          console.log('Complete')
        },
        error: err => {
          console.log(err.message);
        }
      }
    )

  }

  private getTotalPrice() {
    this.cartService.precioCarrito.subscribe(
      {
        next: value => {
          this.totalPrice = value;
        },
        complete: () => {
          console.log('Completado')
        },
        error: err => {
          console.log(err.message);
        }
      }
    )
  }
}
