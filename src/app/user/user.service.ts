import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {personalityForm, registerForm, riasecForm, User, userFormAdmin, userFormProfile, UserStats} from "./User";
import {Router} from "@angular/router";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly _httpClient: HttpClient,
              @Inject('apiUrl') private _apiUrl: string,
              private readonly _router: Router) { }



  getAll(){
    return this._httpClient.get<User[]>(this._apiUrl + "/user/all")
  }

  getAllUserStats(){
    return this._httpClient.get<UserStats[]>(this._apiUrl + "/user/stats/all")
  }

  getById(id: number){
    return this._httpClient.get<User>(this._apiUrl + "/user/" + id)
  }

  getByUsername(username: string){
    return this._httpClient.get<User>(this._apiUrl + "/user/" + username)
  }

  register(form: registerForm){
    return this._httpClient.post(this._apiUrl + "/register", form).pipe(
      tap(value => {
        this._router.navigate(['./login'])
      })
    );
  }

  updateUserAdmin(id: number, form: userFormAdmin){
    return this._httpClient.put(this._apiUrl + "/user/" + id, form)
  }

  updateUserProfile(id: number, form: userFormProfile){
    return this._httpClient.put(this._apiUrl + "/profile/" + id, form)
  }

  updatePersonality(id: number, form: personalityForm){
    return this._httpClient.put<User>(this._apiUrl + "/user/" + id + "/personality", form).pipe(
      tap(value => {
        this._router.navigate(['./profile'])
      })
    );
  }

  updateRiasec(id: number, form: riasecForm){
    return this._httpClient.put<User>(this._apiUrl + "/user/" + id + "/riasec", form).pipe(
      tap(value => {
        this._router.navigate(['./profile'])
      })
    );
  }

  delete(id: number){
    return this._httpClient.delete(this._apiUrl + "/user/" + id)
  }
}
