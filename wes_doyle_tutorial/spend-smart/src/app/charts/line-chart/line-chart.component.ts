import { Component, OnInit } from '@angular/core';
import { LINE_CHART_COLORS } from '../../shared/chart.colors';
import { ExpensesDataServices } from '../../services/expenses-data.service';
import * as moment from 'moment';

import { SharedDataServices } from '../../services/shared-data.service';

const LINE_CHART_SAMPLE_DATA: any[] = [
  { data: [1300, 1100, 1000, 1400, 1500, 1200], label: 'Income' },
  { data: [600, 700, 550, 800, 1000, 1800], label: 'Expenses' },
  { data: [100, 300, 400, 500, 700, 800], label: 'Savings' }
];

const LINE_CHART_LABELS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  date1: string;
  date2: string;

  constructor(
    private _expensesDataServices: ExpensesDataServices,
    private _sharedDataServices: SharedDataServices
  ) {
    this._sharedDataServices.reloadTrackerCalled.subscribe(
      () => {
        this.reloadData();
      }
    )
  }

  reloadData() {
    this._expensesDataServices.getExpensesByDates(this.date1, this.date2).subscribe((res: any[]) => {
      const sortedReloadData = this.sortData(res);
      const strippedReloadData = this.stripData(sortedReloadData, this.date1, this.date2);
      console.log('strippedReloadData:, ', strippedReloadData);
      this.lineChartLabels = strippedReloadData.map(x => x[0]);
      console.log('lineChartLabels2: ', this.lineChartLabels);
      this.lineChartData = [{ 'data': strippedReloadData.map(x => x[1]), 'label': 'Expense' }];
      console.log('lineChartData2: ', this.lineChartData);
    });
  }

  stripData(data, date1, date2) {
    var strippedData = [];
    data.forEach(function (exp) {
      if (exp.date >= date1 && exp.date <= date2) {
        //console.log(exp.date);
        strippedData.push([moment(exp.date).format('YYYY-MM-DD'), exp.amount]);
      }
    })
    console.log(strippedData);
    return strippedData;
  }

  topCompanies: string[];
  allExpenses: any[];

  lineChartData: any;
  lineChartLabels: any;
  lineChartOptions: any = {
    responsive: true
  };
  lineChartLegend: true;
  lineChartColors = LINE_CHART_COLORS;
  lineChartType = 'line';

  ngOnInit() {
    this._sharedDataServices.sharedDate1.subscribe(sharedDate1 => this.date1 = sharedDate1);
    this._sharedDataServices.sharedDate2.subscribe(sharedDate2 => this.date2 = sharedDate2);

    this._expensesDataServices.getExpenses().subscribe((res: any[]) => {
      const localExpensesData = this.getExpensesData(res);
      this.lineChartLabels = localExpensesData.map(x => x[0]);
      console.log('lineChartLabels: ', this.lineChartLabels);
      this.lineChartData = [{ 'data': localExpensesData.map(x => x[1]), 'label': 'Expense' }];
      console.log('lineChartData: ', this.lineChartData);
    });
    this.reloadData()
  }

  getExpensesData(res: any[]) {
    var sortedData = this.sortData(res);
    const formattedData = sortedData.reduce((r, e) => {
      r.push([moment(e.date).format('YYYY-MM-DD'), e.amount]);
      return r;
    }, []);

    const p = [];

    const chartData = formattedData.reduce((r, e) => {
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
