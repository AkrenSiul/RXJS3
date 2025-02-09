import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CosmeticoService} from '../../../services/cosmetico.service';

@Component({
  selector: 'app-add-cosmeticos',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-cosmeticos.component.html',
  styleUrl: './add-cosmeticos.component.css'
})
export class AddCosmeticosComponent {
  private readonly cosmeticoService: CosmeticoService = inject(CosmeticoService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  formCosmetico: FormGroup = this.formBuilder.group(
    {
      name: [''],
      image: [''],
      type: [''],
      brand: [''],
      price: [0],
    }
  )

  get name(): any {
    return this.formCosmetico.get('name')
  }
  get image(): any {
    return this.formCosmetico.get('image')
  }
  get type(): any {
    return this.formCosmetico.get('type')
  }
  get brand(): any {
    return this.formCosmetico.get('brand')
  }
  get price(): any {
    return this.formCosmetico.get('price')
  }


  onSubmit() {
    this.cosmeticoService.addCosmetico(this.formCosmetico.getRawValue()).subscribe(
      {
        next: value => {
          console.log(value);
        },
        error: error => {
          console.log(error);
        },
        complete: () =>{
          console.log('Cosmetico añadido')
        }
      },
    )
  }

}
