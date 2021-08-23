import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserLogged = new BehaviorSubject<boolean>(false);
  private userlogged = false;

  constructor() { }

  login(userName: string, userPassword: string) {
    // TODO: add auth logic...
    this.userlogged = true;
    this.isUserLogged.next(this.userlogged);
  }

  logoff() {
    // TODO: add auth logic...
    this.userlogged = false;
    this.isUserLogged.next(this.userlogged);
  }


  getIsUserLoggedObservable(): Observable<boolean> {
    return this.isUserLogged.asObservable();
  }

  isUserLoggedIn() {
    return this.userlogged;
  }

}
