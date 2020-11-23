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
    return this.httpClient.get(this.REST_API_SERVER);
  }
}
