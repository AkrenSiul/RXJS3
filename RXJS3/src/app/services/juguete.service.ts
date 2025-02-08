import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JugueteInterface} from '../common/juguete-interface';

@Injectable({
  providedIn: 'root'
})
export class JugueteService {
  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }

  getJuguete(page: number): Observable<JugueteInterface>{
    const url = 'https://api-juguetes.vercel.app/api/v2/juguete/juguetes?page=';
    return this.http.get<JugueteInterface>(url+page);
  }
}
