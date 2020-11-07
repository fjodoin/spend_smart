import { Component, OnInit } from '@angular/core';
import { EXPENSE_SAMPLE_DATA } from '../../shared/expense.sample';

@Component({
  selector: 'app-section-history',
  templateUrl: './section-history.component.html',
  styleUrls: ['./section-history.component.css']
})
export class SectionHistoryComponent implements OnInit {

  constructor() { }

  expenses = EXPENSE_SAMPLE_DATA;

  ngOnInit(): void {
  }

}
