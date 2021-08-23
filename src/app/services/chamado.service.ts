import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AppToastService } from './../core/app-toast.service';
import Chamado from '../models/Chamado';
import { environment } from './../../environments/environment';
import  Assunto  from 'src/app/models/Assunto';

@Injectable({
  providedIn: 'root',
})
export class ChamadoService {
  private url = `${environment.url}\\chamado\\`;

  constructor(private http: HttpClient, private toast: AppToastService) {}

  getAll(
    dataInicial: string,
    dataFinal: string,
    responsavel: string,
    status: string,
    assuntos: string[]
  ): Observable<Chamado[]> {
    let params = new HttpParams();
    params = this.checkVarParams('dataInicial', dataInicial, params);
    params = this.checkVarParams('dataFinal', dataFinal, params);
    params = this.checkVarParams('responsavel', responsavel, params);
    params = this.checkVarParams('status', status, params);
    params = this.checkVarParams('assuntos', assuntos, params);

    return this.http
      .get<Chamado[]>(this.url, {
        params: params,
        observe: 'response',
      })
      .pipe(
        map((resp: HttpResponse<Chamado[]>) => {
          return resp.body as Chamado[];
        }),
        catchError((err: HttpErrorResponse) => {
          this.toast.createMessage(
            'Erro ao carregar chamados!',
            err.statusText,
            'error'
          );
          throw err;
        })
      );
  }

  getRelacionados(idChamado: string): Observable<Chamado[]> {
    return this.http
      .get<Chamado[]>(`${this.url}${idChamado}\\relacionados`, {
        observe: 'response',
      })
      .pipe(
        map((resp: HttpResponse<Chamado[]>) => {
          return resp.body as Chamado[];
        }),
        catchError((err: HttpErrorResponse) => {
          this.toast.createMessage(
            'Erro ao carregar chamados relacionados!',
            err.statusText,
            'error'
          );
          throw err;
        })
      );
  }

  getDetalhe(idChamado: string): Observable<Chamado> {
    return this.http
      .get<Chamado>(`${this.url}${idChamado}`, {
        observe: 'response',
      })
      .pipe(
        map((resp: HttpResponse<Chamado>) => {
          return resp.body as Chamado;
        }),
        catchError((err: HttpErrorResponse) => {
          this.toast.createMessage(
            'Erro ao carregar chamado ' + idChamado + '!',
            err.statusText,
            'error'
          );
          throw err;
        })
      );
  }

  editarAssuntos(idChamado: number, ass: Assunto[]) {
    let idsAssunto : number[] = ass.map(a => a.idTag);
    return this.http
      .put(
        `${this.url}${idChamado}`,
        { assuntos: idsAssunto},
        { observe: 'response' }
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toast.createMessage(
            'Erro ao editar assuntos do chamado ' + idChamado + '!',
            err.statusText,
            'error'
          );
          throw err;
        })
      );
  }

  export(
    dataInicial: string,
    dataFinal: string,
    responsavel: string,
    status: string,
    assuntos: string[]
  ) {
    let params = new HttpParams();
    params = this.checkVarParams('dataInicial', dataInicial, params);
    params = this.checkVarParams('dataFinal', dataFinal, params);
    params = this.checkVarParams('responsavel', responsavel, params);
    params = this.checkVarParams('status', status, params);
    params = this.checkVarParams('assuntos', assuntos, params);

    let header = new HttpHeaders().append('Accept', 'application/vnd.ms-excel');

    return this.http
      .get(`${this.url}exportar-excel`, {
        headers: header,
        params: params,
        responseType: 'blob',
      })
      .pipe(
        tap((data) => this.downloadFile(data)),
        catchError((err) => {
          this.toast.createMessage(
            'Erro ao gerar arquivo!',
            err.status,
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

  private downloadFile(data: any) {
    const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);

    let fileName = 'relatorio-chamados.xls';

    var link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  }
}
