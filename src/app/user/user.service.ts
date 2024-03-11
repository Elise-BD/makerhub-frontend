import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {registerForm, User, userForm} from "./User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly _httpClient: HttpClient,
              @Inject('apiUrl') private _apiUrl: string) { }

  getAll(){
    return this._httpClient.get<User[]>(this._apiUrl + "/user/all")
  }

  getById(id: number){
    return this._httpClient.get<User>(this._apiUrl + "/user/" + id)
  }

  getByUsername(username: string){
    return this._httpClient.get<User>(this._apiUrl + "/user/" + username)
  }

  register(form: registerForm){
    return this._httpClient.post(this._apiUrl + "/user/register", form)
  }

  update(id: number, form: userForm){
    return this._httpClient.put(this._apiUrl + "/user/" + id, form)
  }

  delete(id: number){
    return this._httpClient.delete(this._apiUrl + "/user/" + id)
  }
}
