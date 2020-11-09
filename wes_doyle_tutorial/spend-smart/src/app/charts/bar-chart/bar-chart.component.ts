import { Component, OnInit } from '@angular/core';
import { ExpensesDataServices } from '../../services/expenses-data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private _expensesDataServices: ExpensesDataServices) { }

  expenses: any;

  public barChartData: any[];
  public barChartLabels: string[];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
   
  ngOnInit() {
    this._expensesDataServices.getExpenses().subscribe((res: any[]) => {
      console.log(res);
      const localChartData = this.getChartData(res);
      this.barChartLabels = localChartData.map(x => x[0]).sort();
      this.barChartData = [{ 'data': localChartData.map(x => x[1]), 'label': 'Expenses' }];
    });
  }

  getChartData(res: any[]) {
    this.expenses = res;
    const formattedDates = this.expenses.reduce((r, e) => {
      r.push([moment(e.date).format('YY-MM-DD'), e.amount]);
      return r;
    }, []);

    const p = [];

    const chartData = formattedDates.reduce((r, e) => {
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
