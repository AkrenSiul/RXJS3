import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private readonly cartService: CartService = inject(CartService);
  cantidadCarrito: number = 0;

  constructor() {
    this.cartService.cantidadCarrito.subscribe(
      {
        next: value => {
          this.cantidadCarrito = value;
        }
      }
    )
  }
}
