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
  addJuguete(juguete: Juguete): Observable<JugueteInterface>{
    return this.http.post<JugueteInterface>(this.urlBase+'juguetes/', juguete);
  }
  putJuguete(id:string, juguete: Juguete): Observable<any>{
    return this.http.put<any>(this.urlBase+'update/'+id, juguete);
  }
  deleteJuguete(id: string): Observable<any>{
    return this.http.delete<any>(this.urlBase+id);
  }

}
