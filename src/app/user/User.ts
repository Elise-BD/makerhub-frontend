import {Validators} from "@angular/forms";

export class User{
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  personality: PersonalityResult;
  riasec: RiasecResult[];


  constructor(id: number, username: string, firstname: string, lastname: string, personality: PersonalityResult, riasec: RiasecResult[]) {
    this.id = id;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.personality = personality;
    this.riasec = riasec;
  }
}

export enum PersonalityResult{
  INTJ ="INTJ",
  INTP ="INTP",
  ENTJ ="ENTJ",
  ENTP ="ENTP",
  INFJ ="INFJ",
  INFP ="INFP",
  ENFJ ="ENFJ",
  ENFP ="ENFP",
  ISTJ ="ISTJ",
  ISFJ ="ISFJ",
  ESTJ ="ESTJ",
  ESFJ ="ESFJ",
  ISTP ="ISTP",
  ISFP ="ISFP",
  ESTP ="ESTP",
  ESFP ="ESFP"

}

export enum RiasecResult{
  REALISTE ="R",
  INVESTIGATEUR ="I",
  ARTISTE ="A",
  SOCIAL ="S",
  ENTREPRENANT ="E",
  CONVENTIONNEL ="C"
}


export interface registerForm{}

export interface userForm{}

export interface personalityForm{
  personality: PersonalityResult;
}

export const PERSONALITY_FORM ={
  personality:[undefined,[Validators.required]]
}

export interface riasecForm{
  riasec1: RiasecResult;
  riasec2: RiasecResult;
  riasec3: RiasecResult;
}

export const RIASEC_FORM ={
  riasec1: [undefined,[Validators.required]],
  riasec2: [undefined,[Validators.required]],
  riasec3: [undefined,[Validators.required]]
}

