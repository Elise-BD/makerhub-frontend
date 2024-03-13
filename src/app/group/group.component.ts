import {Component, OnDestroy, OnInit} from '@angular/core';
import {Role} from "../login/Auth";
import {Group} from "./Group";
import {Subject, takeUntil} from "rxjs";
import {GroupService} from "./group.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit, OnDestroy{

  $destroyed = new Subject<boolean>();
  groupsList: Group[] = [];

  constructor(private readonly _groupService: GroupService) {
  }

  ngOnInit(){

    this._groupService.getAll().pipe(
      takeUntil(this.$destroyed)).subscribe({
      next: (value) => this.groupsList = value,
      error: (err) => console.log(err.error),
      complete: () => console.log("List of Groups has been read.")
    })


  }


  ngOnDestroy(): void {
    this.$destroyed.next(true);
    this.$destroyed.complete();
  }


}
