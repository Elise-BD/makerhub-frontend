export class User{
  _id: number;
  _username: string;
  _firstname: string;
  _lastname: string;
  _personality: PersonalityResult;
  _riasec: RiasecResult[];


  constructor(id: number, username: string, firstname: string, lastname: string, personality: PersonalityResult, riasec: RiasecResult[]) {
    this._id = id;
    this._username = username;
    this._firstname = firstname;
    this._lastname = lastname;
    this._personality = personality;
    this._riasec = riasec;
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




