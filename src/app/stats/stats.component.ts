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
  chart1: any;
  chart2: any;

  constructor(private readonly _groupService: GroupService,
              private _activatedRoute: ActivatedRoute){}

  createCharts(){
    let analystes: number = 0;
    let diplomates: number = 0;
    let sentinelles: number = 0;
    let explorateurs: number = 0;
    let extravertis: number = 0;
    let introvertis: number = 0;

    if(this.activeGroup != null){
      analystes = this.activeGroup.users.filter(u => u.family == 'ANALYSTES').length;
      diplomates = this.activeGroup.users.filter(u => u.family == 'DIPLOMATES').length;
      sentinelles = this.activeGroup.users.filter(u => u.family == 'SENTINELLES').length;
      explorateurs = this.activeGroup.users.filter(u => u.family == 'EXPLORATEURS').length;
    }

    this.chart1 = new Chart("familiesChart", {
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
          hoverOffset: 50,
          borderAlign: 'inner'
        }],
      },
      options: {
        aspectRatio:3
      }

    });

    if(this.activeGroup != null){
      introvertis = this.activeGroup.users.filter(u => u.firstLetter == 'I').length;
      extravertis = this.activeGroup.users.filter(u => u.firstLetter == 'E').length;
    }

    this.chart2 = new Chart("extraversionChart", {
      type: 'pie', // type of chart

      data: {// values on X-Axis
        labels: ['Introvertis', 'Extravertis'],
        datasets: [{
          label: 'Répartition par attitude E/I',
          data: [introvertis, extravertis],
          backgroundColor: [
            'rgb(50, 132, 152)',
            'rgb(244, 160, 65)'
          ],
          hoverOffset: 30,
          borderAlign: 'inner'
        }],
      },
      options: {
        aspectRatio:3
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
            this.createCharts();},
          error: (err) => console.log(err.error),
        }
      )
    }

  }

  ngOnDestroy() {

  }
}
