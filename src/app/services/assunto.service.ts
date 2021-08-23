import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import Assunto from '../models/Assunto';
import { AppToastService } from '../core/app-toast.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssuntoService {
  private url = `${environment.url}/assuntos/`;

  constructor(private http: HttpClient, private toast: AppToastService) {}

  getAll(): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(this.url, { observe: 'response' }).pipe(
      map((resp: HttpResponse<Assunto[]>) => resp.body as Assunto[]),
      catchError((err: HttpErrorResponse) => {
        this.toast.createMessage(
          'Erro ao carregar assuntos!',
          err.statusText,
          'error'
        );
        throw err;
      })
    );
  }
}
