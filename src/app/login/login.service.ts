import {Inject, Injectable, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Auth, authForm, Role} from "./Auth";
import {BehaviorSubject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit{
  connectedUser = new BehaviorSubject<Auth | null>(null)

  constructor(private readonly _httpClient: HttpClient,
              private readonly _router: Router,
              @Inject('apiUrl') private _apiUrl: string) { }

  ngOnInit(){
    let roles: Role[] = [];
    if(localStorage.getItem('role') == 'ADMIN'){
      roles.push(Role.ADMIN);
    } else if(localStorage.getItem('role') == 'ENCADRANT'){
      roles.push(Role.ENCADRANT);
    } else roles.push(Role.UTILISATEUR);

    console.log(localStorage.getItem('token'));
    if(localStorage.getItem('token')){
      let auth: Auth;
      auth = {
        token: localStorage.getItem('token')!,
        roles: roles,
        username: localStorage.getItem('username')!
      }
      console.log(auth);
      this.connectedUser.next(
        auth
      )
    }
  }

  login(auth: authForm){
    return this._httpClient.post<Auth>(`${this._apiUrl}/user/login`, auth).pipe(
      tap(value => {
        localStorage.setItem('token', value.token);
        localStorage.setItem('role', value.roles.toString());
        localStorage.setItem('username', value.username);
        this.connectedUser.next(value);
        this._router.navigate(['home'])
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    this.connectedUser.next(null);
    this._router.navigate(['login'])
  }
}
