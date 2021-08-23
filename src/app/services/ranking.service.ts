import { catchError, map } from 'rxjs/operators';
import { AppToastService } from './../core/app-toast.service';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import Ranking from '../models/Ranking';

@Injectable({
  providedIn: 'root'
})
export class RankingService{
  private url = `${environment.url}/ranking/`;

  constructor(private http: HttpClient, private toast: AppToastService) {}

  getAll(

    dataInicial?: string|null,
    dataFinal?: string|null,
    status?: string|null,
    tipoRanking?: number
  ): Observable<Ranking[]> {

    let params = new HttpParams();
    params = this.checkVarParams('dataInicial', dataInicial, params);
    params = this.checkVarParams('dataFinal', dataFinal, params);
    params = this.checkVarParams('tipoRanking', tipoRanking, params);
    params = this.checkVarParams('status', status, params);

   //usar ao tirat o json/assets this.url
    return this.http.get<Ranking[]>('assets/dados.json', { observe: 'response', params: params }).pipe(
      map((resp: HttpResponse<Ranking[]>) =>{
        console.log( resp.body)
        return  resp.body as Ranking[]
      }),
      catchError((err: HttpErrorResponse) => {
        this.toast.createMessage(
          'Erro ao carregar rankings!',
          err.statusText,
          'error'
        );
        throw err;
      })
    );
  }

  private checkVarParams(
    paramKey: string,
    paramValue: any,
    params: HttpParams
  ): HttpParams {
    if (paramValue !== null && paramValue !== undefined) {
      params = params.append(paramKey, paramValue);
    }

    return params;
  }
}
