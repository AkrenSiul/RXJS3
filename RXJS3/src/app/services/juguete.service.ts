import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Juguete, JugueteInterface} from '../common/juguete-interface';

@Injectable({
  providedIn: 'root'
})
export class JugueteService {
  private readonly http: HttpClient = inject(HttpClient);
  urlBase = 'https://api-juguetes.vercel.app/api/v2/juguete/';

  constructor() { }

  getJuguetes(page: number): Observable<JugueteInterface>{
    const url = 'https://api-juguetes.vercel.app/api/v2/juguete/juguetes?page=';
    return this.http.get<JugueteInterface>(url+page);
  }
  getJuguete(id: string): Observable<Juguete>{
    return this.http.get<Juguete>(this.urlBase+'juguete/'+id);
  }
  addJuguete(juguete: Juguete): Observable<any>{
    return this.http.post<any>(this.urlBase+'juguetes/', juguete);
  }
  putJuguete(juguete: Juguete) {
    return this.http.put(this.urlBase+'update/'+juguete._id, juguete);
  }
  deleteJuguete(id: string): Observable<any>{
    return this.http.delete<any>(this.urlBase+'delete/'+id);
  }

}
