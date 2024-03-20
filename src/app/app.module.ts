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
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatTable,
  MatTableModule
} from "@angular/material/table";
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuModule} from "@angular/material/menu";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";

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
    StatsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BaseChartDirective,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatButtonModule,
    MatIcon,
    BrowserAnimationsModule,
    MatMenu,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardActions,
    MatCardModule
  ],
  providers: [
    {provide: 'apiUrl', useValue: "http://localhost:8080/api"},
    {provide: HTTP_INTERCEPTORS, useClass: authenticationInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
