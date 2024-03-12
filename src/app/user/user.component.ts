import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {UserService} from "./user.service";
import {LoginService} from "../login/login.service";
import {FormBuilder} from "@angular/forms";
import {Auth, Role} from "../login/Auth";
import {User} from "./User";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit, OnDestroy{

  $destroyed = new Subject<boolean>();
  activeUserRole: Role = Role.UTILISATEUR;
  usersList: User[] = [];
  deleteConfirmation: boolean = false;
  idUserToDelete: number|null = null;

  constructor(private readonly _userService: UserService,
              private readonly _loginService: LoginService,
              private readonly _formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this._userService.getAll().pipe(
      takeUntil(this.$destroyed)).subscribe({
      next: (value) => this.usersList = value,
      error: (err) => console.log(err.error),
      complete: () => console.log("List of Users has been read.")
    })


    this._loginService.connectedUser.subscribe(
      (value) => {
        if (value != null){
          if(value.roles.toString() == 'ADMIN'){
            console.log('PRINT ROLES : ' +value.roles.toString());
            this.activeUserRole = Role.ADMIN;
          } else if(value.roles.toString() == 'ENCADRANT'){
            this.activeUserRole = Role.ENCADRANT;
          } else this.activeUserRole = Role.UTILISATEUR;
        }
      }
    )
  }

  askDeleteConfirmation(id: number){
    this.deleteConfirmation = true;
    this.idUserToDelete = id;
  }

  cancelDelete(id: number){
    this.deleteConfirmation = false;
    this.idUserToDelete = null;
  }

  delete(id: number){
    this._userService.delete(id).subscribe(
      {next: ()=> {
        alert("Utilisateur ID "+id +" supprimé.")
        this.deleteConfirmation = false;
        this.ngOnInit();
        },
      error: (err) => console.log(err.error)}
    )
  }

  ngOnDestroy() {
    this.$destroyed.next(true);
    this.$destroyed.complete();
  }

  protected readonly Role = Role;
  protected readonly Auth = Auth;
}
