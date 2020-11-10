import { Component, OnInit } from '@angular/core';
import { ExpensesDataServices } from '../../services/expenses-data.service';
import { Expense } from '../../shared/expense';

@Component({
  selector: 'app-section-history',
  templateUrl: './section-history.component.html',
  styleUrls: ['./section-history.component.css']
})
export class SectionHistoryComponent implements OnInit {

  constructor(private _expensesDataServices: ExpensesDataServices) { }

  expenses: Expense[];
  total = 0;
  page = 1;
  limit = 10;

  ngOnInit() {
    this._expensesDataServices.getExpenses().subscribe((res: Expense[]) => {
      const localPaginationData = this.getPaginationData(res);
      console.log(localPaginationData);
    });
  }

  getPaginationData(res: Expense[]) {
    this.expenses = res;
    //do stuff here
    return this.expenses;
  }

  goToPrevious(): void {
    console.log('Previous button clicked');
  }

  goToNext(): void {
    console.log('Next button clicked');
  }
}
