import { Component, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { format } from 'util';
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
  ) {
    this._sharedDataServices.reloadTrackerCalled.subscribe(
      () => {
        this.reloadData();
      }
    )
  }

  ngOnInit() {
    /*
    this._expensesDataServices.getExpenses().subscribe((res: any[]) => {
      //console.log('res1', res);
      this.expenseDataByCompany = this.getExpenseDataByCompany(res);
      this.expenseDataByType = this.getExpenseDataByType(res);
    });
    */
    this._sharedDataServices.sharedDate1.subscribe(sharedDate1 => this.date1 = sharedDate1);
    this._sharedDataServices.sharedDate2.subscribe(sharedDate2 => this.date2 = sharedDate2);
    this.reloadData();
  }

  stripData(data, date1, date2) {
    var strippedData = [];
    data.forEach(function (exp) {
      if (exp.date >= date1 && exp.date <= date2) {
        strippedData.push({
          "id": exp.id,
          "company": exp.company,
          "amount": exp.amount,
          "date": moment(exp.date).format('YYYY-MM-DD'),
          "type": exp.type
      });
      }
    })
    //console.log(strippedData);
    return strippedData;
  }

  sortData(res: any[]) {
    const sortedArray = res.sort((a, b) => {
      if (a.date > b.date) { return 1; }
      if (a.date < b.date) { return -1; }
      return 0;
    });
    return sortedArray;
  }

  reloadData() {
    this._expensesDataServices.getExpensesByDates(this.date1, this.date2).subscribe((res: any[]) => {
      const sortedReloadData = this.sortData(res);
      const strippedReloadData = this.stripData(sortedReloadData, this.date1, this.date2);
      console.log('strippedReloadData: ', strippedReloadData);
      this.expenseDataByCompany = this.getExpenseDataByCompany(strippedReloadData);
      //console.log('ExpenseDataByCompany: ', this.expenseDataByCompany);
      this.expenseDataByType = this.getExpenseDataByType(strippedReloadData);
    });
  }

  inputChaged() {
    console.log('changed');
  }

  getExpenseDataByCompany(res: any[]) {
    return this.getData(res, 'company');
  }

  getExpenseDataByType(res: any[]) {
    return this.getData(res, 'type');
  }

  getData(input: any[], dataType: string) {
    //console.log('input: ', input);
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
    //console.log('formattedData: ', formattedData);
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
    //console.log('inputData: ', inputData);
    return inputData;
    }
}
