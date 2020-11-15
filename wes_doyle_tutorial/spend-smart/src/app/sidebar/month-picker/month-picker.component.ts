import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.css']
})
export class MonthPickerComponent implements OnInit {

  constructor() {
  }

  date = new Date();
  public date1 = new FormControl(new Date(this.date.getFullYear(), this.date.getMonth(), 1));
  public date2 = new FormControl(new Date());
  dateArray = [this.date1.value, this.date2.value];

  ngOnInit() {
    this.emitData();
  }

  emitData() {
    //console.log();
    return this.dateArray;
  }
}
