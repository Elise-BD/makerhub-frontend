import { Component } from '@angular/core';
import {map} from "rxjs";
import {LoginService} from "../../login/login.service";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  activeUser = this._loginService.connectedUser.pipe(
    map(u => u?.roles.toString().toLowerCase())
  );

  constructor(private readonly _loginService: LoginService) {
  }

  disconnect(){
    this._loginService.logout();
  }
}
