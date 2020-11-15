import { Component, Output, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Subject } from "rxjs/Subject";

import { MonthPickerComponent } from './month-picker/month-picker.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {

  @ViewChild(MonthPickerComponent)
  private monthPicker: MonthPickerComponent;

  @Output() d1: any;
  @Output() d2: any;
  
  constructor() { }

  ngAfterViewInit(): void {
    console.log('init');
    console.log('dateArray: ', this.monthPicker.emitData());
  }

  analyzeDates() {
    console.log('dateArray: ', this.monthPicker.emitData());
  }
}
