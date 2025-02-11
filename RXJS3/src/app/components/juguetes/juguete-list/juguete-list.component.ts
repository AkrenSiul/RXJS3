import {Component, inject, Input, OnInit} from '@angular/core';
import {JugueteService} from '../../../services/juguete.service';
import {Juguete, JugueteInterface} from '../../../common/juguete-interface';
import {RouterLink} from '@angular/router';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {SearchService} from '../../../services/search.service';
import {CurrencyPipe} from '@angular/common';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-juguete-list',
  imports: [
    RouterLink,
    NgbPagination,
    CurrencyPipe
  ],
  templateUrl: './juguete-list.component.html',
  styleUrl: './juguete-list.component.css'
})
export class JugueteListComponent implements OnInit {
  @Input('id')id!: string;
  private readonly jugueteService: JugueteService = inject(JugueteService);
  private readonly searchService: SearchService = inject(SearchService);
  private readonly cartService: CartService = inject(CartService);
  detail = false;
  currentPage = 1;
  apiData!: JugueteInterface;
  juguetes: Juguete[] = [];
  juguete!: Juguete;

  ngOnInit() {
    if(!this.id) {
      this.getJuguetes(this.currentPage);
      this.loadSearch();
    }else {
      this.detail = true;
      this.getJuguete(this.id)
    }
  }


  private getJuguetes(currentPage: number) {
    return this.jugueteService.getJuguetes(currentPage).subscribe(
      {
        next: value => {
          this.juguetes = value.juguetes.juguetes;
          this.apiData = value;
        },
        complete: () => {
          console.log('Complete');
        },
        error: err => {
          console.log(err.message);
        }
      }
    )

  }

  private getJuguete(id: string) {
    this.jugueteService.getJuguete(id).subscribe(
      {
        next: value => {
          this.juguete = value;
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

  onDelete(juguete: Juguete) {
    if(confirm('¿Deseas eliminar el juguete?')){
      this.jugueteService.deleteJuguete(juguete._id).subscribe(
        {
          next: value => {
            this.juguete = value;
          },
          complete: () => {
            console.log('Complete');
          },
          error: err => {
            console.log(err.message);
          }
        }
      )
    }

  }

  loadData() {
    return this.jugueteService.getJuguetes(this.currentPage).subscribe(
      {
        next: value => {
          this.juguetes = value.juguetes.juguetes;
          this.apiData = value;
        },
        complete: () => {
          console.log('Complete');
        },
        error: err => {
          console.log(err.message);
        }
      }
    )
  }

  private loadSearch() {
    return this.searchService.startToy().subscribe(
      {
        next: value => {
          this.juguetes = value;
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

  search(event: any) {
    if(event.target.value === ''){
      this.getJuguetes(this.currentPage);
    }else {
      this.searchService.search(event.target.value);
    }
  }

  addToCart(juguete: Juguete) {
    this.cartService.addToCartJuguete(juguete);
  }
}
