import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject, switchMap} from 'rxjs';
import {Juguete} from '../common/juguete-interface';
import {Cosmetico} from '../common/cosmeticos-interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly urlSearch = 'https://api-juguetes.vercel.app/api/v2/juguete/jugueteByName/';
  private readonly urlSearchCosm = 'https://api-cosmeticos.vercel.app/api/v2/cosmeticos/cosmeticoByName/'
  private palabra: Subject<string> = new Subject<string>();
  private toySearch$: Observable<Juguete[]> = this.palabra.pipe(
    switchMap(word => {
      return this.http.get<Juguete[]>(this.urlSearch+word)
    })
  )
  private cosmeticSearch$: Observable<Cosmetico[]> = this.palabra.pipe(
    switchMap(word => {
      return this.http.get<Cosmetico[]>(this.urlSearchCosm+word);
    })
  )

  search(name: string){
    this.palabra.next(name);
  }

  startToy(): Observable<Juguete[]>{
    return this.toySearch$;
  }
  startCosmetic(): Observable<Cosmetico[]>{
    return this.cosmeticSearch$;
  }


  constructor() { }
}
