import { Component, OnInit } from '@angular/core';
import { LINE_CHART_COLORS } from '../../shared/chart.colors';
import { ExpensesDataServices } from '../../services/expenses-data.service';
import * as moment from 'moment';


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

  constructor(private _expensesDataServices: ExpensesDataServices) { }

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
    this._expensesDataServices.getExpenses().subscribe((res: any[]) => {
      console.log('res:', res);
      const localExpensesData = this.getExpensesData(res);
      this.lineChartLabels = localExpensesData.map(x => x[0]);
      console.log('data: ', localExpensesData.map(x => x[1]));
      this.lineChartData = [{ 'data': localExpensesData.map(x => x[1]), 'label': 'Expense' }];

    });
  }
  getExpensesData(res: any[]) {
    var sortedData = this.sortData(res);
    const formattedData = sortedData.reduce((r, e) => {
      r.push([moment(e.date).format('YY-MM-DD'), e.amount]);
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
