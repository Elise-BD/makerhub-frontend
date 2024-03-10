import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {LoginService} from "./login.service";
import {Auth, LOGIN_FORM} from "./Auth";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  connectedUser: BehaviorSubject<Auth | null> = new BehaviorSubject<Auth | null>(null);

  constructor(private readonly _loginService: LoginService,
              private readonly _formBuilder: FormBuilder) {
    this._loginService.logout();
    this.loginForm = this._formBuilder.group(LOGIN_FORM);
  }

  connection(){
    if(this.loginForm.valid){
      this._loginService.login(this.loginForm.value).subscribe({
        error: err => {
          if(err.status === 403){
            alert("Erreur d'authentification.")
          } else {
            console.log(err)
            alert("Erreur mais pas de détails ! Niark, niark !")
          }
        }
      });
    } else {alert("Formulaire invalide.")}

    this.connectedUser = this._loginService.connectedUser;

  }

}
