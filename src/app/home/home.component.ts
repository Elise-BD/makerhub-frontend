import { Component } from '@angular/core';
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  activeUser!: string|null;

  constructor(private readonly _loginService: LoginService) {
  }

  ngOnInit(){
    this._loginService.connectedUser.subscribe(
      (value) => {
        if (value != null){
          this.activeUser = value!.username
        } else this.activeUser = null;
      }
    )
  }
}
