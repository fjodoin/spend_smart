import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IncomesDataService {

  private REST_API_SERVER = "http://localhost:5000/api/spendster/incomes";

  constructor(private httpClient: HttpClient) { }

  public geIncomes() {
    return this.httpClient.get(this.REST_API_SERVER);
  }

  public getIncomesByDates(date1, date2) {
    //console.log('lol here', date1, date2);
    return this.httpClient.get(this.REST_API_SERVER + "/date1=" + date1 + "&" + "date2=" + date2);
  }
}
