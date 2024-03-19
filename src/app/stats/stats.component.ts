import {Component, OnDestroy, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";
import {Group} from "../group/Group";
import {GroupService} from "../group/group.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit, OnDestroy{
  activeGroup!: Group;
  chart: any;

  constructor(private readonly _groupService: GroupService,
              private _activatedRoute: ActivatedRoute){}

  createChart(){
    let analystes: number = 0;
    let diplomates: number = 0;
    let sentinelles: number = 0;
    let explorateurs: number = 0;

    if(this.activeGroup != null){
      analystes = this.activeGroup.users.filter(u => u.family == 'ANALYSTES').length;
      diplomates = this.activeGroup.users.filter(u => u.family == 'DIPLOMATES').length;
      sentinelles = this.activeGroup.users.filter(u => u.family == 'SENTINELLES').length;
      explorateurs = this.activeGroup.users.filter(u => u.family == 'EXPLORATEURS').length;
    }

    console.log(analystes, diplomates, sentinelles, explorateurs)
    console.log(this.activeGroup)

    this.chart = new Chart("MyChart", {
      type: 'pie', // type of chart

      data: {// values on X-Axis
        labels: ['Analystes', 'Diplomates','Sentinelles','Explorateurs'],
        datasets: [{
          label: 'Répartition par familles',
          data: [analystes, diplomates, sentinelles, explorateurs],
          backgroundColor: [
            'rgb(131, 99, 150)',
            'rgb(81, 162, 120)',
            'rgb(84, 151, 177)',
            'rgb(222, 174, 81)'
          ],
          hoverOffset: 8
        }],
      },
      options: {
        aspectRatio:2.5
      }

    });
  }


  ngOnInit(){

    let groupId = this._activatedRoute.snapshot.params['id'];
    if(groupId){
      this._groupService.getById(groupId).subscribe(
        {
          next: (value) => {
            this.activeGroup = value;
            this.createChart();},
          error: (err) => console.log(err.error),
        }
      )
    }

  }

  ngOnDestroy() {

  }
}
