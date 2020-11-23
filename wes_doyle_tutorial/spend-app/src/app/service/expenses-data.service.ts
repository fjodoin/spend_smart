import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpensesDataService {

  private REST_API_SERVER = "http://localhost:5000/api/spendster/expenses";

  constructor(private httpClient: HttpClient) { }

  public getExpenses() {
    return this.httpClient.get(this.REST_API_SERVER);
  }
}
