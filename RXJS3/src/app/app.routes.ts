import { Routes } from '@angular/router';
import {JugueteListComponent} from './components/juguetes/juguete-list/juguete-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'juguete-list',
    pathMatch: "full"
  },
  {
    path: 'juguete-list',
    component: JugueteListComponent
  }
];
