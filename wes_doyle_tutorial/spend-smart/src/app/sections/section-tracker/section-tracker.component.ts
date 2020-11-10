import { Component, OnInit } from '@angular/core';
import { ExpensesDataServices } from '../../services/expenses-data.service';
import * as moment from 'moment';
import { format } from 'util';

@Component({
  selector: 'app-section-tracker',
  templateUrl: './section-tracker.component.html',
  styleUrls: ['./section-tracker.component.css']
})
export class SectionTrackerComponent implements OnInit {

  expenseDataByCompany: any;
  expenseDataByType: any;

  constructor(private _expensesDataServices: ExpensesDataServices) { }

  ngOnInit() {
    this._expensesDataServices.getExpenses().subscribe((res: any[]) => {
      //console.log(res);
      this.expenseDataByCompany = this.getExpenseDataByCompany(res);
      //console.log(this.getExpenseDataByCompany(res));
      this.expenseDataByType = this.getExpenseDataByType(res);
      //console.log(this.getExpenseDataByType(res));
        
    });
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
