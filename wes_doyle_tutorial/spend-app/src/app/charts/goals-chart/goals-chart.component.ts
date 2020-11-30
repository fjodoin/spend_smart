import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { GoalsDataService } from '../../service/goals-data.service';

@Component({
  selector: 'app-goals-chart',
  templateUrl: './goals-chart.component.html',
  styleUrls: ['./goals-chart.component.css']
})
export class GoalsChartComponent implements OnInit {

  constructor(private _goalsDataService: GoalsDataService) { }

  public goalsChartData: any[];
  public goalsChartLabels: string[];
  public goalsChartType = 'bar';
  public goalsChartLegend = true;
  public goalsChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  ngOnInit(): void {
    this._goalsDataService.getGoals().subscribe((res: any[]) => {
      let sortedRes = this.sortData(res);
      const localGoalsData = this.getGoalsData(sortedRes);
      //console.log('here', localGoalsData);
      this.goalsChartLabels = localGoalsData.map(x => x[0]);
      this.goalsChartData = [
        { 'data': localGoalsData.map(x => x[1]), 'label': 'Saved' },
        { 'data': localGoalsData.map(x => x[2]), 'label': 'Goal' }
      ];
      //console.log(this.goalsChartData);
    });
  }

  sortData(res: any[]) {
    const sortedArray = res.sort((a, b) => {
      if (a.dateGoal > b.dateGoal) { return 1; }
      if (a.dateGoal < b.dateGoal) { return -1; }
      return 0;
    });
    return sortedArray;
  }

  getGoalsData(sortedRes: any[]) {
    const formattedGoals = sortedRes.reduce((r, e) => {
      r.push([e.company, e.amountSaved, e.amountGoal, moment(e.dateGoal).format('YYYY-MM-DD')]);
      return r;
    }, []);

    const p = [];

    const chartData = formattedGoals.reduce((r, e) => {
      const key = e[0];
      if (!p[key]) {
        p[key] = e;
        r.push(p[key]);
      }
      else {
        p[key][1] += e[1];
      }
      return r;
    }, []);

    return chartData;
  }

}
