import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../user/User";
import {Group, groupCreationForm} from "./Group";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private readonly _httpClient: HttpClient,
              @Inject('apiUrl') private _apiUrl: string,
              private readonly _router: Router) { }

  getAll(){
    return this._httpClient.get<Group[]>(this._apiUrl + "/group/all");
  }

  //USED FOR STATISTICS
  getById(id: number){
    return this._httpClient.get<Group>(this._apiUrl + "/group/stats/" + id);
  }

  create(form: groupCreationForm){
    return this._httpClient.post(this._apiUrl + "/group/create", form).pipe(
      tap(value => {
        this._router.navigate(['./group'])
      })
    );
  }

  delete(id: number){
    return this._httpClient.delete(this._apiUrl + "/group/" + id);
  }

  activeUserJoinsGroup(groupId: number){
    return this._httpClient.get(this._apiUrl + "/group/join/" + groupId);
  }
  addUserToGroup(groupId: number, username: string){
    return this._httpClient.get(this._apiUrl + "/group/join/" +groupId+ "/" +username)
  }

  activeUserLeavesGroup(groupId: number){
    return this._httpClient.get(this._apiUrl + "/group/leave/" + groupId);
  }

  removeUserFromGroup(groupId: number, username: string){
    return this._httpClient.get(this._apiUrl + "/group/leave/" +groupId+ "/" +username)
  }

}
