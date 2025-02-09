import {Component, inject, Input, OnInit} from '@angular/core';
import {JugueteService} from '../../../services/juguete.service';
import {Juguete, JugueteInterface} from '../../../common/juguete-interface';
import {RouterLink} from '@angular/router';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-juguete-list',
  imports: [
    RouterLink,
    NgbPagination
  ],
  templateUrl: './juguete-list.component.html',
  styleUrl: './juguete-list.component.css'
})
export class JugueteListComponent implements OnInit {
  @Input('id')id!: string;
  private readonly jugueteService: JugueteService = inject(JugueteService);
  detail = false;
  currentPage = 1;
  apiData!: JugueteInterface;
  juguetes: Juguete[] = [];
  juguete!: Juguete;

  ngOnInit() {
    if(!this.id) {
      this.getJuguetes(this.currentPage);
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
    this.currentPage++;
  }
}
