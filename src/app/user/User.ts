import {Validators} from "@angular/forms";
import {Role} from "../login/Auth";
import {Group} from "../group/Group";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import type = _default.defaults.animations.numbers.type;

// ADMIN USER LIST

export class User{
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  personality: PersonalityResult;
  riasec: RiasecResult[];
  groups: number[];

  constructor(id: number, username: string, firstname: string, lastname: string, personality: PersonalityResult, riasec: RiasecResult[], groups: number[]) {
    this.id = id;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.personality = personality;
    this.riasec = riasec;
    this.groups = groups;
  }
}

// ENCADRANT ANALYSIS PAGE

export class UserStats{
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  personality: string;
  family: string;
  type: string;
  firstLetter: string;
  middleLetters: string;
  lastLetter: string;
  riasec: RiasecResult[];


  constructor(id: number, username: string, firstname: string, lastname: string, personality: string, family: string, type: string, firstLetter: string, middleLetters: string, lastLetter: string, riasec: RiasecResult[]) {
    this.id = id;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.personality = personality;
    this.family = family;
    this.type = type;
    this.firstLetter = firstLetter;
    this.middleLetters = middleLetters;
    this.lastLetter = lastLetter;
    this.riasec = riasec;
  }
}

// ANONYMOUS STATS DASHBOARD

export class UserStatsShort{
  personality: string;
  family: string;
  type: string;
  firstLetter: string;
  middleLetters: string;
  lastLetter: string;
  riasec: RiasecResult[];

  constructor(personality: string, family: string, type: string, firstLetter: string, middleLetters: string, lastLetter: string, riasec: RiasecResult[]) {
    this.personality = personality;
    this.family = family;
    this.type = type;
    this.firstLetter = firstLetter;
    this.middleLetters = middleLetters;
    this.lastLetter = lastLetter;
    this.riasec = riasec;
  }
}

// ENUMS

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


// FORMS AND VALIDATORS

export interface registerForm{
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

export const REGISTER_FORM ={
  username: ['', [Validators.required, Validators.minLength(3)]],
  password: ['', [Validators.required, Validators.minLength(8)]],
  firstname: ['', [Validators.required, Validators.minLength(2)]],
  lastname: ['', [Validators.required, Validators.minLength(2)]],
}

export interface userFormAdmin{
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  role: Role;
  personality: PersonalityResult;
  riasec1: RiasecResult;
  riasec2: RiasecResult;
  riasec3: RiasecResult;
}

export interface userFormProfile{
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

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

