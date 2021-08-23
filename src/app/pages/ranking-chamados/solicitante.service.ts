import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SolicitantesInterface } from './solicitante';
@Injectable({
  providedIn:'root'
})
export class SolicitantesService {
  constructor(private http: HttpClient) {}
  getSolicitantes() {
    return this.http
      .get<any>('assets/arquivos.json')
      .toPromise()
      .then(res => <SolicitantesInterface[]>res.data)
      .then(data => {
        return data;
      });
  }
}
