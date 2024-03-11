import { Component } from '@angular/core';
import {Role} from "../login/Auth";
import {User} from "../user/User";
import {Observable, Subject, takeUntil} from "rxjs";
import {UserService} from "../user/user.service";
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  pseudo: string = "";
  activeUser: User | null = null;
  $destroyed = new Subject<boolean>();

  constructor(private readonly _userService: UserService,
              private readonly _loginService: LoginService){}

  ngOnInit() {

    this._loginService.connectedUser.subscribe(
      (value) => {
        if(value != null){
          this.pseudo = value.username;
        }
      }
    )

    this._userService.getByUsername(this.pseudo).pipe(
      takeUntil(this.$destroyed)).subscribe({
        next: value => this.activeUser = value,
        error: (err) => console.log(err.error)
      }
    )

  }

  ngOnDestroy() {
    this.$destroyed.next(true);
    this.$destroyed.complete();
  }

    protected readonly Role = Role;
}
