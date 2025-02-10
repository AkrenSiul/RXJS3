import {Component, Inject, inject, OnInit} from '@angular/core';
import {JugueteService} from '../../../services/juguete.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Juguete} from '../../../common/juguete-interface';

@Component({
  selector: 'app-add-juguetes',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-juguetes.component.html',
  styleUrl: './add-juguetes.component.css'
})
export class AddJuguetesComponent implements OnInit{
  @Inject('id')id!: string;
  private readonly jugueteService: JugueteService = inject(JugueteService);
  private readonly router: Router = inject(Router);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  juguete!: Juguete;
  edit = false;

  formJuguete: FormGroup = this.formBuilder.group(
    {
      nombre: ['', [Validators.required]],
      imagen: ['',[Validators.required]],
      categoria: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0)]],
      edadMinima: [0, [Validators.required, Validators.min(0)]]
    }
  )

  ngOnInit() {
    console.log(this.id);
    if(this.id){
      this.edit = true;
      this.getJuguete(this.id)
    }else{
      this.edit = false;

    }
  }

  private nombre(): any {
    return this.formJuguete.get('nombre')
  }
  private img(): any {
    return this.formJuguete.get('imagen')
  }
  private categoria(): any {
    return this.formJuguete.get('categoria')
  }
  private precio(): any {
    return this.formJuguete.get('precio')
  }
  private edadMinima(): any {
    return this.formJuguete.get('edadMinima')
  }

  onSubmit() {
    this.jugueteService.addJuguete(this.formJuguete.getRawValue()).subscribe(
      {
        next: value => {
          console.log(value);
        },
        complete: () => {
          console.log('Juguete enviado');
          this.router.navigateByUrl("juguetes-list");
        },
        error: err => {
          console.log(err.message);
        }
      }
    )
  }

  private getJuguete(id: string) {
    return this.jugueteService.getJuguete(id).subscribe(
      {
        next: value => {
          this.juguete = value;
        },
        complete: () => {
          console.log('Juguete traído');
        },
        error: err => {
          console.log(err.message);
        }
      }
    )

  }


  onSubmitUpdate() {
    console.log(this.id);
    this.jugueteService.putJuguete(this.id, this.formJuguete.getRawValue()).subscribe(
      {
        next: value => {
          console.log(value);
        },
        error: err => {
          console.log(err);
        },
        complete: () => {
          console.log(this.juguete);
          this.router.navigate(['/inicio']);
        }
      }
    )
}

}
