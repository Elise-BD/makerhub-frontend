import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Chart} from "chart.js/auto";
import {Group} from "../group/Group";
import {GroupService} from "../group/group.service";
import {ActivatedRoute} from "@angular/router";
import {MatSort} from "@angular/material/sort";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {UserStats} from "../user/User";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit, OnDestroy, AfterViewInit{
  activeGroup!: Group;
  dataSource!: MatTableDataSource<UserStats>;
  displayedColumns: string[] = ['firstname', 'personality', 'family', 'type', 'firstletter', 'middleletters', 'lastletter', 'riasec', 'riasec1', 'riasec2', 'riasec3'];
  chart1: any;
  chart2: any;
  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator){this.dataSource.paginator = paginator};
  @ViewChild(MatSort) set matSort(sort: MatSort){this.dataSource.sort = sort};

  constructor(private readonly _groupService: GroupService,
              private _activatedRoute: ActivatedRoute){

  }

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

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
            console.log(value);
            this.activeGroup = value;
            this.createCharts();
            this.dataSource = new MatTableDataSource(this.activeGroup.users);},
          error: (err) => console.log(err.error),
        }
      )
    }

  }

  ngOnDestroy() {

  }
}
