import { Component, OnInit } from '@angular/core';
import { PickerService } from '../../service/picker.service';
import { ExpensesDataService } from '../../service/expenses-data.service';
import { THEME_COLORS } from '../../shared/theme.colors';
import moment from 'moment';


const theme = 'Bright';

@Component({
  selector: 'app-type-chart',
  templateUrl: './type-chart.component.html',
  styleUrls: ['./type-chart.component.css']
})
export class TypeChartComponent implements OnInit {

  constructor(
    private _pickerService: PickerService,
    private _expensesDataService: ExpensesDataService
  ) {
    this._pickerService.datepickerDatesChangedCalled.subscribe(() => { this.updateChartData() })
  }

  public typeChartData: number[];
  public typeChartLabels: string[];
  public typeChartLegend = true;
  public typeChartType = 'pie';
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
      let sortedRes = this.sortData(res);
      const localTypeData = this.getTypeData(sortedRes);
      //console.log(localTypeData);
      this.typeChartData = localTypeData.map(x => x[1]);
      this.typeChartLabels = localTypeData.map(x => x[0]);
    });
  }

  themeColors(setName: string): string[] {
    const c = THEME_COLORS.slice(0).find(set => set.name == setName).colorSet;
    return c;
  }

  sortData(res: any[]) {
    const sortedArray = res.sort((a, b) => {
      if (a.dateExpense > b.dateExpense) { return 1; }
      if (a.dateExpense < b.dateExpense) { return -1; }
      return 0;
    });
    return sortedArray;
  }

  getTypeData(sortedRes: any[]) {
    const formattedTypes = sortedRes.reduce((r, e) => {
      r.push([e.type, e.amount]);
      return r;
    }, []);

    const p = [];

    const chartData = formattedTypes.reduce((r, e) => {
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
