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

    this.chart = new Chart("MyChart", {
      type: 'bar', //type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
        datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
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
            this.activeGroup = value;},
          error: (err) => console.log(err.error),
        }
      )
    }

    this.createChart();
  }

  ngOnDestroy() {

  }
}
