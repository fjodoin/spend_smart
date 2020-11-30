import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoalsDataService {

  private REST_API_SERVER = "http://localhost:5000/api/spendster/goals";

  constructor(private httpClient: HttpClient) { }

  public getGoals() {
    return this.httpClient.get(this.REST_API_SERVER);
  }
}
