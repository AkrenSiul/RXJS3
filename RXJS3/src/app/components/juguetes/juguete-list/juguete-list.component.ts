import {Component, inject, Input, OnInit} from '@angular/core';
import {JugueteService} from '../../../services/juguete.service';
import {FormBuilder} from '@angular/forms';
import {Juguete} from '../../../common/juguete-interface';
import {CurrencyPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-juguete-list',
  imports: [
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './juguete-list.component.html',
  styleUrl: './juguete-list.component.css'
})
export class JugueteListComponent implements OnInit {
  @Input('id')id!: string;
  private readonly jugueteService: JugueteService = inject(JugueteService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  detail = false;
  currentPage = 1;
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
}
