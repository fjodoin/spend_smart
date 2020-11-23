import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { Router } from '@angular/router';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NavigationService } from '../service/navigation.service'


const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DatepickerComponent implements OnInit {

  constructor(
    private _navigationService: NavigationService,
    private router: Router
  ) {
    this._navigationService.currentPageChangedCalled.subscribe(() => { this.displayPicker() })
    }

  //Date variables for Date Picker
  date1: any;
  date2: any;

  //Date variable for Month picker
  date = new FormControl(moment());

  ngOnInit(): void {
    this.displayPicker();
  }

  displayPicker() {
    var currentPage = this._navigationService.getCurrentpage().value;
    var dPicker = document.getElementById('dPicker');
    var mPicker = document.getElementById('mPicker');

    console.log('current page: ', currentPage);

    if (currentPage === '/tracker' || currentPage === '/') {
      mPicker.style.display = "none";
      dPicker.style.display = "block";
    }
    else if (currentPage === '/budget') {
      mPicker.style.display = "block";
      dPicker.style.display = "none";
    }
    else {
      console.log('else quit');
    }
  }

  //Month Picker Functions
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
}
