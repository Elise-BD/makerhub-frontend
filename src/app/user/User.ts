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
  INTJ,
  INTP,
  ENTJ,
  ENTP,
  INFJ,
  INFP,
  ENFJ,
  ENFP,
  ISTJ,
  ISFJ,
  ESTJ,
  ESFJ,
  ISTP,
  ISFP,
  ESTP,
  ESFP

}

export enum RiasecResult{
  R,
  I,
  A,
  S,
  E,
  C
}


export interface registerForm{}

export interface userForm{}




