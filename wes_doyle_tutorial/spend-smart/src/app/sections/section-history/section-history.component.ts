import { Component, OnInit } from '@angular/core';
import { EXPENSE_SAMPLE_DATA } from '../../shared/expense.sample';

@Component({
  selector: 'app-section-history',
  templateUrl: './section-history.component.html',
  styleUrls: ['./section-history.component.css']
})
export class SectionHistoryComponent implements OnInit {

  constructor() { }

  //expenses: Expense[];
  expenses = EXPENSE_SAMPLE_DATA;

  total = 0;
  page = 1;
  limit = 3;

  ngOnInit(): void {
    //API GET EXPENSES HERE
    //getExpenses(this.page, this.limit)
  }

  goToPrevious(): void {
    console.log('Previous button clicked');
  }

  goToNext(): void {
    console.log('Next button clicked');
  }
}
