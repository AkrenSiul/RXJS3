import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {CosmeticoService} from '../../../services/cosmetico.service';
import {Cosmetico} from '../../../common/cosmeticos-interface';

@Component({
  selector: 'app-cosmetico-list',
  imports: [
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './cosmetico-list.component.html',
  styleUrl: './cosmetico-list.component.css'
})
export class CosmeticoListComponent {
  @Input('id')id!: string;
  private readonly cosmeticoService: CosmeticoService = inject(CosmeticoService);
  cosmeticos: Cosmetico[] = [];
  currentPage = 1;
  sizePage = 20;

  constructor(){
    this.getCosmeticos();
  }

  private getCosmeticos() {
    return this.cosmeticoService.getCosmeticos(this.currentPage,this.sizePage).subscribe(
      {
        next: value => {
          this.cosmeticos = value.cosmeticos.cosmeticos;
        },
        error: error => {
          console.log(error);
        },
        complete: () => {
          console.log('Cosmeticos traídos');
        }
      }
    );
  }


  onDelete(id: string) {
    confirm("Estás seguro de que quieres eliminar este producto?")
    {
      return this.cosmeticoService.deleteCosmetico(this.id).subscribe(
        {
          next: value => {
            console.log(value);
          },
          error: error => {
            console.log(error);
          },
          complete: () => {
            console.log('Elemento eliminado')
          }
        }
      )
    }
  }

}
