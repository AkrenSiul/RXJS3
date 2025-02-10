import {Component, inject, Input, OnInit} from '@angular/core';
import {CosmeticoService} from '../../../services/cosmetico.service';
import {Cosmetico} from '../../../common/cosmeticos-interface';

@Component({
  selector: 'app-detail-cosmetico',
  imports: [],
  templateUrl: './detail-cosmetico.component.html',
  styleUrl: './detail-cosmetico.component.css'
})
export class DetailCosmeticoComponent implements OnInit{
  @Input('id')id!: string;
  private readonly cosmeticoService: CosmeticoService = inject(CosmeticoService);
  cosmetico!: Cosmetico;

  ngOnInit(): void {
    console.log(this.id)
    this.getCosmetico(this.id);
  }

  private getCosmetico(id: string) {
    return this.cosmeticoService.getCosmetico(id).subscribe(
      {
        next: value => {
          console.log(id);
          console.log(value);
          console.log(this.cosmetico);
          this.cosmetico = value;
          console.log(this.cosmetico);
        },
        complete: () => {
          console.log('Cosmético traído');
        },
        error: err => {
          console.log(err.message);
        }
      }
    )
  }
}
