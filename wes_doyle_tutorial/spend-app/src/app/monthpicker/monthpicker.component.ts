import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { Router } from '@angular/router';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NavigationService } from '../service/navigation.service'
import { PickerService } from '../service/picker.service';


const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM',
  },
  display: {
    dateInput: 'YYYY-MM',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY MMMM',
  },
};

@Component({
  selector: 'app-monthpicker',
  templateUrl: './monthpicker.component.html',
  styleUrls: ['./monthpicker.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class MonthpickerComponent implements OnInit {

  constructor(
    private _navigationService: NavigationService,
    private _pickerService: PickerService,
    private router: Router
  ) {
    this._navigationService.currentPageChangedCalled.subscribe(() => { this.displayPicker() })
  }

  //Month variable for Month picker
  month = new FormControl(moment());

  ngOnInit(): void {
    this.displayPicker();
  }

  displayPicker() {
    var currentPage = this._navigationService.getCurrentpage().value;
    var mPicker = document.getElementById('mPicker');

    //console.log('current page: ', currentPage);

    if (currentPage === '/budget') {
      mPicker.style.display = "block";
    }
    else {
      mPicker.style.display = "none";
    }
  }

  //Month Picker Functions
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.month.value;
    ctrlValue.year(normalizedYear.year());
    this.month.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, monthpicker: MatDatepicker<Moment>) {
    const ctrlValue = this.month.value;
    ctrlValue.month(normalizedMonth.month());
    this.month.setValue(ctrlValue);
    this._pickerService.setCurrentMonthpickerMonth(this.month.value.format('YYYY-MM'));
    monthpicker.close();
  }
}
