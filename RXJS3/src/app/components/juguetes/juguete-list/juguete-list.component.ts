import {Component, inject, Input, OnInit} from '@angular/core';
import {JugueteService} from '../../../services/juguete.service';
import {Juguete} from '../../../common/juguete-interface';
import {CurrencyPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {NgbToast} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-juguete-list',
  imports: [
    CurrencyPipe,
    RouterLink,
    NgbToast
  ],
  templateUrl: './juguete-list.component.html',
  styleUrl: './juguete-list.component.css'
})
export class JugueteListComponent implements OnInit {
  @Input('id')id!: string;
  private readonly jugueteService: JugueteService = inject(JugueteService);
  detail = false;
  currentPage = 1;
  juguetes: Juguete[] = [];
  juguete!: Juguete;
  toastShow = false;
  toast = {
    message: '',
    color: 'bg-success'
  }


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
        },
        complete: () => {
          this.toastShow = true;
          this.showToast('Juguetes traídos correctamente', 'bg-success');
          setTimeout(() =>
          {
            this.toastShow = false;
          },2500)
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

  private showToast(message: string, color: string) {
    this.toast.message = message;
    this.toast.color = color;
  }
}
