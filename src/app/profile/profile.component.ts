import {Component} from '@angular/core';
import {Role} from "../login/Auth";
import {
  PERSONALITY_FORM,
  personalityForm,
  PersonalityResult,
  RIASEC_FORM,
  riasecForm,
  RiasecResult,
  User, userForm
} from "../user/User";
import {Subject, takeUntil} from "rxjs";
import {UserService} from "../user/user.service";
import {LoginService} from "../login/login.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  pseudo: string = "";
  activeUser: User | null = null;
  $destroyed = new Subject<boolean>();
  personalityForm: FormGroup;
  riasecForm: FormGroup

  constructor(private readonly _userService: UserService,
              private readonly _loginService: LoginService,
              private readonly _formBuilder: FormBuilder){
    this.personalityForm = this._formBuilder.group(PERSONALITY_FORM);
    this.riasecForm = this._formBuilder.group(RIASEC_FORM);
  }

  ngOnInit() {

    this._loginService.connectedUser.subscribe(
      (value) => {
        if(value != null){
          this.pseudo = value.username;
        }
      }
    )

    this._userService.getByUsername(this.pseudo).pipe(
      takeUntil(this.$destroyed)).subscribe({
        next: value => this.activeUser = value,
        error: (err) => console.log(err.error)
      }
    )

  }

  updatePersonality(){
    if(this.personalityForm.valid) {
      this._userService.updatePersonality(this.activeUser!.id, this.personalityForm.value).subscribe({
        next: value => {alert("Personalité mise à jour.");
          this.personalityForm.reset();
          this.ngOnInit()},
        error: err => {
          if(err.status === 403){
            alert("Problème d'authentification.")
          } else if(err.error.status === 400){
            alert("Problème de complétion du formulaire.")
          } else {
            alert("Autre erreur non identifiée...")
          }
        }}
      )
    }
  }

  updateRiasec(){
    if(this.riasecForm.valid) {
      this._userService.updateRiasec(this.activeUser!.id, this.riasecForm.value).subscribe({
        next: value => {alert("Intérêts professionnels mis à jour.");
          this.riasecForm.reset();
          this.ngOnInit()},
        error: err => {
          if(err.status === 403){
            alert("Problème d'authentification.")
          } else if(err.error.status === 400){
            alert("Problème de complétion du formulaire.")
          } else {
            alert("Autre erreur non identifiée...")
          }
        }}
      )
    }
  }

  ngOnDestroy() {
    this.$destroyed.next(true);
    this.$destroyed.complete();
  }


  protected readonly Role = Role;
  public PersonalityResult = PersonalityResult;
  protected readonly User = User;
  protected readonly RiasecResult = RiasecResult;
}
