import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../user/user.service";
import {LoginService} from "../login/login.service";
import {REGISTER_FORM, registerForm} from "../user/User";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private readonly _userService: UserService,
              private readonly _formBuilder: FormBuilder){
    this.registerForm = this._formBuilder.group(REGISTER_FORM);
  }

  registerUser(){
    if(this.registerForm.valid){
      this._userService.register(this.registerForm.value).subscribe({
        next: () => {alert("Nouvel utilisateur créé.")},
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


}
