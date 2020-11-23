import { Component, OnInit } from '@angular/core';
import { ExpensesDataServices } from '../../services/expenses-data.service';

@Component({
  selector: 'app-section-history',
  templateUrl: './section-history.component.html',
  styleUrls: ['./section-history.component.css']
})
export class SectionHistoryComponent implements OnInit {

  constructor(private _expensesDataServices: ExpensesDataServices) { }

  expenses: any;
  tempExpenses: any;
  current_page = 1;
  number_of_pages: any;
  limit = 9;

  ngOnInit() {
    this._expensesDataServices.getExpenses().subscribe((res: any) => {
      this.tempExpenses = this.getPaginationData(res);
      this.loadPageData();
      
    });
  }

  getPaginationData(res: any) {
    const tRes = res;
    this.number_of_pages = Math.ceil((tRes.length / this.limit));
    return tRes;
  }

  loadPageData() {
    const head_value = (this.current_page - 1) * this.limit;
    this.expenses = this.tempExpenses.slice(head_value, head_value + this.limit);
  }

  goToPrevious(): void {
    if (this.current_page > 1) {
      this.current_page--;
      this.loadPageData();
    }
  }

  goToNext(): void {
    if (this.current_page < this.number_of_pages) {
      this.current_page++;
      this.loadPageData()
    }
  }
}
