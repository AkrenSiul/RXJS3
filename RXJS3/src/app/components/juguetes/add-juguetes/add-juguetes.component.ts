import {Component, inject, Input, OnInit} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {Juguete} from '../../../common/juguete-interface';
import {JugueteService} from '../../../services/juguete.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-add-juguetes',
    imports: [
        CurrencyPipe
    ],
  templateUrl: './add-juguetes.component.html',
  styleUrl: './add-juguetes.component.css'
})
export class AddJuguetesComponent implements OnInit{
  @Input('id')id!: string;
  private readonly jugueteService: JugueteService = inject(JugueteService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  juguete!: Juguete;

  ngOnInit() {
    if(this.id){

    }else {
      this.addJuguete(this.juguete);
    }
  }

  private addJuguete(juguete: Juguete) {
    return this.jugueteService.addJuguete(juguete).subscribe(
      {
        next: value => {
          this.juguete = value;
        }
      }
    )

  }

}
