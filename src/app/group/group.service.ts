import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../user/User";
import {Group} from "./Group";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private readonly _httpClient: HttpClient,
              @Inject('apiUrl') private _apiUrl: string,
              private readonly _router: Router) { }

  getAll(){
    return this._httpClient.get<Group[]>(this._apiUrl + "/group/all")
  }


}
