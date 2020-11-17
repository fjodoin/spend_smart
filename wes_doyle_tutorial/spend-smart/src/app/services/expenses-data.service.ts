import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ExpensesDataServices {

  private REST_API_SERVER = "http://localhost:5000/api/spendster/expenses";

  constructor(private httpClient: HttpClient) { }

  public getExpenses() {
    return this.httpClient.get(this.REST_API_SERVER);
  }

  public getExpensesByDates(date1, date2) {

    var tempReturn: any;

    let tempDate1 = new Date(date1);
    let monthDate1 = tempDate1.getMonth() + 1;
    let yearDate1 = tempDate1.getFullYear();
    const monthYearDate1 = yearDate1 + "-" + monthDate1;
    //console.log('monthYearDate1:', monthYearDate1);

    let tempDate2 = new Date(date2);
    let monthDate2 = tempDate2.getMonth() + 1;
    let yearDate2 = tempDate2.getFullYear();
    const monthYearDate2 = yearDate2 + "-" + monthDate2;
    //console.log('monthYearDate2:', monthYearDate2);

    if (monthDate1 < monthDate2) {
      console.log('m1 < m2');
    }
    else if (monthDate1 > monthDate2) {
      console.log('m1 > m2');
    }
    else {
      console.log('m1 == m2');
      tempReturn = this.httpClient.get(this.REST_API_SERVER + "/month/" + monthYearDate1);
    }

    return tempReturn;
  }
}
