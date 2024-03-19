import {Component, OnDestroy, OnInit} from '@angular/core';
import {Role} from "../login/Auth";
import {Group, GROUP_CREATION} from "./Group";
import {Subject, takeUntil} from "rxjs";
import {GroupService} from "./group.service";
import {LoginService} from "../login/login.service";
import {UserService} from "../user/user.service";
import {User} from "../user/User";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit, OnDestroy{

  activePseudo: string = "";
  activeRole: string = "";
  activeUser: User | null = null;
  activeUserGroups: number[] = [];
  $destroyed = new Subject<boolean>();
  groupsList: Group[] = [];
  groupCreationForm: FormGroup;

  constructor(private readonly _groupService: GroupService,
              private readonly _loginService: LoginService,
              private readonly _userService: UserService,
              private readonly _formBuilder: FormBuilder,
              private readonly _router: Router) {
    this.groupCreationForm = this._formBuilder.group(GROUP_CREATION);
  }

  ngOnInit(){

    this._loginService.connectedUser.subscribe(
      (value) => {
        if(value != null){
          this.activePseudo = value.username;
          this.activeRole = value.roles.toString();
        }
      }
    )

    this._userService.getByUsername(this.activePseudo).pipe(
      takeUntil(this.$destroyed)).subscribe({
        next: value => {
          this.activeUser = value;
          this.activeUserGroups = this.activeUser.groups;
        },
        error: (err) => console.log(err.error)
      }
    )

    this._groupService.getAll().pipe(
      takeUntil(this.$destroyed)).subscribe({
      next: (value) => this.groupsList = value,
      error: (err) => console.log(err.error),
      complete: () => console.log("List of Groups has been read.")
    })


  }

  createGroup(){
    if(this.groupCreationForm.valid){
      this._groupService.create(this.groupCreationForm.value).subscribe({
        next: () => {
          alert("Nouveau groupe créé.");
          this.groupCreationForm.reset();
          this.ngOnInit();},
        error: err => {
          if(err.status === 403){
            alert("Problème d'authentification.")
          } else if(err.error.status === 400){
            alert("Problème de complétion du formulaire.")
          } else {
            alert("Autre erreur non identifiée...")
          }
        }
      })
    }
  }

  joinGroup(group: Group){
    if(!group.users.map(u => u.username).includes(this.activePseudo)){
      this._groupService.activeUserJoinsGroup(group.id).pipe(
        takeUntil(this.$destroyed)).subscribe({
        next: () => this.ngOnInit(),
        error: (err) => console.log(err.error)
      })
    }
  }

  leaveGroup(group: Group){
    if(group.users.map(u => u.username).includes(this.activePseudo)){
      this._groupService.activeUserLeavesGroup(group.id).pipe(
        takeUntil(this.$destroyed)).subscribe({
        next: () => this.ngOnInit(),
        error: (err) => console.log(err.error)
      })
    }
  }

  getStats(groupId: number){
    this._router.navigate(['./stats/' + groupId]);
  }

  delete(groupId: number) {
    this._groupService.delete(groupId).subscribe(
      {
        next: () => this.ngOnInit(),
        error: (err) => console.log(err.error),
        complete: () => alert("Groupe supprimé.")
      }
    )
  }


  ngOnDestroy(): void {
    this.$destroyed.next(true);
    this.$destroyed.complete();
  }


  protected readonly Role = Role;
}
