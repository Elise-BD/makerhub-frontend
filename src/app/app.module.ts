import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Common/header/header.component';
import { FooterComponent } from './Common/footer/footer.component';
import { NavComponent } from './Common/nav/nav.component';
import { Page404Component } from './Common/page404/page404.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {authenticationInterceptor} from "./login/authentication.interceptor";
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { StatsComponent } from './stats/stats.component';
import {BaseChartDirective} from "ng2-charts";
import {BarController} from "chart.js";
import {MatTabHeader} from "@angular/material/tabs";
import {MatTable} from "@angular/material/table";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    Page404Component,
    HomeComponent,
    UserComponent,
    GroupComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BaseChartDirective,
    MatTabHeader,
    MatTable
  ],
  providers: [
    {provide: 'apiUrl', useValue: "http://localhost:8080/api"},
    {provide: HTTP_INTERCEPTORS, useClass: authenticationInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
