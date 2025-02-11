import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Cosmetico, Cosmeticos, CosmeticosInterface} from '../common/cosmeticos-interface';

@Injectable({
  providedIn: 'root'
})
export class CosmeticoService {
  private readonly http: HttpClient = inject(HttpClient);
  urlBase = 'https://api-cosmeticos.vercel.app/api/v2/cosmeticos/'

  constructor() { }

  getCosmeticos(page: number, size: number): Observable<CosmeticosInterface>{
    const url = 'https://api-cosmeticos.vercel.app/api/v2/cosmeticos/paged?page='
    return this.http.get<CosmeticosInterface>(url+page+'&limit='+size);
  }
  getCosmetico(id: string): Observable<Cosmetico>{
    return this.http.get<Cosmetico>(this.urlBase+'detail/'+id);
  }
  addCosmetico(cosmetico: Cosmetico): Observable<CosmeticosInterface>{
    return this.http.post<CosmeticosInterface>(this.urlBase+'addOne/',cosmetico);
  }
  putCosmetico(cosmetico: Cosmetico): Observable<Cosmetico>{
    return this.http.put<Cosmetico>(this.urlBase+'updateOne/'+cosmetico._id, cosmetico);
  }
  deleteCosmetico(id: string): Observable<any>{
    return this.http.delete<any>(this.urlBase+'deleteOne/'+id);
  }
}
