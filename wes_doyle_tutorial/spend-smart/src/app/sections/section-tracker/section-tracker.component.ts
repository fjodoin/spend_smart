import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpensesDataServices } from '../../services/expenses-data.service';

import { SharedDataServices } from '../../services/shared-data.service';


@Component({
  selector: 'app-section-tracker',
  templateUrl: './section-tracker.component.html',
  styleUrls: ['./section-tracker.component.css']
})
export class SectionTrackerComponent implements OnInit {

  expenseDataByCompany: any;
  expenseDataByType: any;

  date1: string;
  date2: string;

  constructor(
    private _expensesDataServices: ExpensesDataServices,
    private _sharedDataServices: SharedDataServices
  ) { }

  ngOnInit() {
    this._expensesDataServices.getExpenses().subscribe((res: any[]) => {
      this.expenseDataByCompany = this.getExpenseDataByCompany(res);
      this.expenseDataByType = this.getExpenseDataByType(res);
    });
    this._sharedDataServices.sharedDate1.subscribe(sharedDate1 => this.date1 = sharedDate1);
    this._sharedDataServices.sharedDate2.subscribe(sharedDate2 => this.date2 = sharedDate2);
    console.log('date1: ', this.date1);
    console.log('date2: ', this.date2);
  }

  getExpenseDataByCompany(res: any[]) {
    return this.getData(res, 'company');
  }

  getExpenseDataByType(res: any[]) {
    return this.getData(res, 'type');
  }

  getData(input: any[], dataType: string) {

    const p = [];
    const formattedData = input.reduce((r, e) => {
      if (dataType == 'company') {
        r.push([e.company, e.amount]);
      }
      else if (dataType == 'type') {
        r.push([e.type, e.amount]);
      }
        return r;
      }, []);
    const inputData = formattedData.reduce((r, e) => {
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
    return inputData;
    }
}
