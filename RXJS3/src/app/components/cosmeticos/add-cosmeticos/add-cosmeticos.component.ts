import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CosmeticoService} from '../../../services/cosmetico.service';
import {CurrencyPipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-cosmeticos',
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
  ],
  templateUrl: './add-cosmeticos.component.html',
  styleUrl: './add-cosmeticos.component.css'
})
export class AddCosmeticosComponent implements OnInit {
  @Input('id')id!: string;
  private readonly cosmeticoService: CosmeticoService = inject(CosmeticoService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  editar = false;
  cargado = false;

  formCosmetico: FormGroup = this.formBuilder.group(
    {
      _id: [],
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      type: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      price: [0, [Validators.required]],
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
    if(this.id){
      this.cosmeticoService.putCosmetico(this.formCosmetico.getRawValue()).subscribe(
        {
          complete: () => {
            console.log('Juguete updateado')
            this.router.navigateByUrl('cosmeticos-list')
          },
          error: err => {
            console.log(err.message);
          }
        }
      )

    }else {
      this.cosmeticoService.addCosmetico(this.formCosmetico.getRawValue()).subscribe(
        {
          next: value => {
            console.log(value);
          },
          error: error => {
            console.log(error);
          },
          complete: () => {
            console.log('Cosmetico añadido')
            this.router.navigateByUrl('cosmeticos-list')
          }
        },
      )
    }
  }

  ngOnInit() {
    this.loadCosmeticos();
  }

  private loadCosmeticos() {
    if(this.id){
      this.cargado = true;
      this.cosmeticoService.getCosmetico(this.id).subscribe(
        {
          next: value =>  {
            this.formCosmetico.setValue(value);
          },
          complete: () => {
            console.log('Completado')
          },
          error: err => {
            console.log(err.message);
          }
        }
      )
    }else {
      this.editar = false;
      this.formCosmetico.reset();
      this.cargado = true;
    }
  }
}
