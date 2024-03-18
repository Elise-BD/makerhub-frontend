import {User} from "../user/User";
import {Validators} from "@angular/forms";

export class Group{
  id: number;
  name: string;
  users: User[];

  constructor(id: number, name: string, users: User[]) {
    this.id = id;
    this.name = name;
    this.users = users;
  }


}

export interface groupCreationForm{
  name: string;
}

export const GROUP_CREATION={
  name:['',[Validators.required, Validators.minLength(3)]]
}
