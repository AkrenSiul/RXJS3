import { Routes } from '@angular/router';
import {JugueteListComponent} from './components/juguetes/juguete-list/juguete-list.component';
import {AddJuguetesComponent} from './components/juguetes/add-juguetes/add-juguetes.component';
import {CosmeticoListComponent} from './components/cosmeticos/cosmetico-list/cosmetico-list.component';
import {AddCosmeticosComponent} from './components/cosmeticos/add-cosmeticos/add-cosmeticos.component';
import {JugueteCartComponent} from './components/juguetes/juguete-cart/juguete-cart.component';
import {DetailCosmeticoComponent} from './components/cosmeticos/detail-cosmetico/detail-cosmetico.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'juguetes-list',
    pathMatch: "full"
  },
  {
    path: 'juguetes-list',
    component: JugueteListComponent
  },
  {
    path: 'juguetes-list/:id',
    component: JugueteListComponent
  },
  {
    path: 'add-juguete',
    component: AddJuguetesComponent
  },
  {
    path: 'add-juguete/:id',
    component: AddJuguetesComponent
  },
  {
    path: 'cosmeticos-list',
    component: CosmeticoListComponent
  },
  {
    path: 'cosmeticos-detail/:id',
    component: DetailCosmeticoComponent
  },
  {
    path: 'add-cosmetico',
    component: AddCosmeticosComponent
  },
  {
    path: 'edit-cosmetico/:id',
    component: AddCosmeticosComponent
  },
  {
    path: 'carrito',
    component: JugueteCartComponent
  },
];
