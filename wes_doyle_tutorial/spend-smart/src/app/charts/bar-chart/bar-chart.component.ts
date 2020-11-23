import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ExpensesDataServices } from '../../services/expenses-data.service';
import * as moment from 'moment';

import { MonthPickerComponent } from '../../sidebar/month-picker/month-picker.component';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements AfterViewInit {

  @ViewChild(MonthPickerComponent)
  public mPicker: MonthPickerComponent;

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
   
  ngAfterViewInit() {
    this._expensesDataServices.getExpenses().subscribe((res: any[]) => {
      const localChartData = this.getChartData(res);
      this.barChartLabels = localChartData.map(x => x[0]);
      this.barChartData = [{ 'data': localChartData.map(x => x[1]), 'label': 'Expenses' }];
    });
  }

  getChartData(res: any[]) {
    var sortedData = this.sortData(res);
    const formattedDates = sortedData.reduce((r, e) => {
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

  sortData(res: any[]) {
    const sortedArray = res.sort((a, b) => {
      if (a.date > b.date) { return 1; }
      if (a.date < b.date) { return -1; }
      return 0;
    });
    return sortedArray;
  }

 }
