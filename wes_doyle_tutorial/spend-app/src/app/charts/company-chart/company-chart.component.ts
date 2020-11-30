import { Component, OnInit } from '@angular/core';
import { PickerService } from '../../service/picker.service';
import { ExpensesDataService } from '../../service/expenses-data.service';
import { THEME_COLORS } from '../../shared/theme.colors';
import moment from 'moment';


const theme = 'Bright';

@Component({
  selector: 'app-company-chart',
  templateUrl: './company-chart.component.html',
  styleUrls: ['./company-chart.component.css']
})
export class CompanyChartComponent implements OnInit {

  constructor(
    private _pickerService: PickerService,
    private _expensesDataService: ExpensesDataService
  ) {
    this._pickerService.datepickerDatesChangedCalled.subscribe(() => { this.updateChartData() })
  }

  public companyChartData: number[];
  public companyChartLabels: string[];
  public companyChartLegend = true;
  public companyChartType = 'doughnut';
  public colors: any[] = [
    {
      backgroundColor: this.themeColors(theme),
      borderColor: '#333'
    }
  ];

  ngOnInit(): void {
    this.updateChartData();
  }

  updateChartData() {
    const dates = this._pickerService.getCurrentDatepickerDates();
    this._expensesDataService.getExpensesByDates(dates[0].value, dates[1].value).subscribe((res: any[]) => {
      console.log(res);
      let sortedRes = this.sortData(res);
      const localCompanyData = this.getCompanyData(sortedRes);
      console.log(localCompanyData);
      //this.companyChartData = localCompanyData.map(x => x[2]);
      this.companyChartData = localCompanyData.map(x => x[1]);
      this.companyChartLabels = localCompanyData.map(x => x[0]);
    });
  }

  themeColors(setName: string): string[] {
    const c = THEME_COLORS.slice(0).find(set => set.name == setName).colorSet;
    return c;
  }

  sortData(res: any[]) {
    const sortedArray = res.sort((a, b) => {
      if (a.dateGoal > b.dateExpense) { return 1; }
      if (a.dateGoal < b.dateExpense) { return -1; }
      return 0;
    });
    return sortedArray;
  }

  getCompanyData(sortedRes: any[]) {
    const formattedGoals = sortedRes.reduce((r, e) => {
      r.push([e.company, e.amount]);
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
