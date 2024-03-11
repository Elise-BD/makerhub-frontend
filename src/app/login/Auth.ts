import {Validators} from "@angular/forms";

export class Auth{
  token: string;
  roles: Role[];
  username: string;

  constructor(token: string, roles: Role[], username: string) {
    this.token = token;
    this.roles = roles;
    this.username = username;
  }
}

export enum Role{
  ADMIN,
  UTILISATEUR,
  ENCADRANT
}

export const LOGIN_FORM ={
  username:['',[Validators.required,Validators.minLength(3)]],
  password:['',[Validators.required,Validators.minLength(8)]]
}

export interface authForm{
  username: string;
  password: string;
}

