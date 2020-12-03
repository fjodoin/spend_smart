import { Component, OnInit } from '@angular/core';
import { PickerService } from '../../service/picker.service';
import { ExpensesDataService } from '../../service/expenses-data.service';
import { IncomesDataService } from '../../service/incomes-data.service';
import { LINE_CHART_COLORS } from '../../shared/chart.colors';
import { Local } from 'protractor/built/driverProviders';
import moment from 'moment';


const LINE_CHART_SAMPLE_DATA: any[] = [
  { data: [1300, 1100, 1000, 1400, 1500, 1200], label: 'Income' },
  { data: [600, 700, 550, 800, 1000, 1800], label: 'Expenses' },
  { data: [100, 300, 400, 500, 700, 800], label: 'Savings' }
];

const LINE_CHART_LABELS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

@Component({
  selector: 'app-date-chart',
  templateUrl: './date-chart.component.html',
  styleUrls: ['./date-chart.component.css']
})
export class DateChartComponent implements OnInit {

  constructor(
    private _pickerService: PickerService,
    private _expensesDataService: ExpensesDataService,
    private _incomesDataService: IncomesDataService
  ) {
    this._pickerService.datepickerDatesChangedCalled.subscribe(() => { this.updateChartData() })
  }

  dateChartData: any;
  dateChartLabels: any;
  dateChartOptions: any = {
    responsive: true
  };
  dateChartLegend: true;
  dateChartColors = LINE_CHART_COLORS;
  dateChartType = 'line';

  ngOnInit(): void {
    this.updateChartData();
  }

  updateChartData() {
    let localDateData = [];
    const dates = this._pickerService.getCurrentDatepickerDates();

    //expenses called here
    this._expensesDataService.getExpensesByDates(dates[0].value, dates[1].value).subscribe((res: any[]) => {
      let sortedRes = this.sortExpenseData(res);
      const localExpenseDateData = this.getDateExpenseData(sortedRes);
      localExpenseDateData.forEach(function (itemExpense) {
        localDateData.push(itemExpense);
      })

      //incomes called here
      this._incomesDataService.getIncomesByDates(dates[0].value, dates[1].value).subscribe((res: any[]) => {
        let sortedRes = this.sortIncomeData(res);
        const localIncomeDateData = this.getDateIncomeData(sortedRes);
        localIncomeDateData.forEach(function (itemIncome) {
          localDateData.push(itemIncome);
        })
        const formattedDateData = this.formatDateData(localDateData);
        this.dateChartLabels = formattedDateData.map(x => x[0]);
        this.dateChartData = [
          { data: formattedDateData.map(x => x[1]), label: 'Expense' },
          { data: formattedDateData.map(x => x[3]), label: 'Income' }
        ];
      })  
    });
  }

  sortExpenseData(res: any[]) {
    const sortedArray = res.sort((a, b) => {
      if (a.dateExpense > b.dateExpense) { return 1; }
      if (a.dateExpense < b.dateExpense) { return -1; }
      return 0;
    });
    return sortedArray;
  }

  sortIncomeData(res: any[]) {
    const sortedArray = res.sort((a, b) => {
      if (a.dateIncome > b.dateIncome) { return 1; }
      if (a.dateIncome < b.dateIncome) { return -1; }
      return 0;
    });
    return sortedArray;
  }

  getDateExpenseData(sortedRes: any[]) {
    const formattedDates = sortedRes.reduce((r, e) => {
      r.push([moment(e.dateExpense).format('YYYY-MM-DD'), e.amount, 'Expense']);
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

  getDateIncomeData(sortedRes: any[]) {
    const formattedDates = sortedRes.reduce((r, e) => {
      r.push([moment(e.dateIncome).format('YYYY-MM-DD'), e.amount, 'Income']);
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

  formatDateData(allData: any[]) {
    const localAllData = allData;
    const p = [];

    const chartData = localAllData.reduce((r, e) => {
      const key = e[0];
      if (!p[key]) {
        var newE: any[];
        if (e[2].includes('Expense')) {
          newE = [e[0], e[1], e[2], 0, 'Income']
        }
        else if (e[2].includes('Income')) {
          newE = [e[0], 0, 'Expense', e[1], e[2]]
        }
        p[key] = newE;
        r.push(p[key]);
      }
      
      else {
        //console.log('duplicate date: ', e);
        //console.log('already existing: ', p[key]);
        if (e[2].includes('Expense')){
          p[key][1] + e[1];
        }
        else if (e[2].includes('Income')){
          p[key][3] += e[1];
        }
        //console.log('after stuff: ', p[key]);
      }
      return r;
    }, []);

    return chartData;
  }
}
