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
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY MMMM',
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
    private _pickerService: PickerService,
    private router: Router
  ) {
      this._navigationService.currentPageChangedCalled.subscribe(() => { this.displayPicker() })
  }

  picker = new Date();
  //Date variables for Date Pickers
  dpickerDate1: any;
  dpickerDate2: any;

  ngOnInit(): void {
    this.displayPicker();
    this.dpickerDate1 = new FormControl(new Date(this.picker.getFullYear(), this.picker.getMonth(), 1));
    this.dpickerDate2 = new FormControl(new Date());

    this.setCurrentDatepickerDates(
      moment(this.dpickerDate1.value).format('YYYY-MM-DD'),
      moment(this.dpickerDate2.value).format('YYYY-MM-DD')
    )
  }

  displayPicker() {
    var currentPage = this._navigationService.getCurrentpage().value;
    var dPicker = document.getElementById('dPicker');

    if (currentPage === '/tracker' || currentPage === '/') {
      dPicker.style.display = "block";
    }
    else {
      dPicker.style.display = "none";
    }
  }

  onDateChange(datePicked, datepicker) {
    if (datepicker == 'datepickerDate1') {
      this.dpickerDate1 = datePicked;
      this.setCurrentDatepickerDates(
        this.dpickerDate1.value.format('YYYY-MM-DD'),
        moment(this.dpickerDate2.value).format('YYYY-MM-DD'));
    }
    else if (datepicker == 'datepickerDate2') {
      this.dpickerDate2 = datePicked;
      this.setCurrentDatepickerDates(
        moment(this.dpickerDate1.value).format('YYYY-MM-DD'),
        this.dpickerDate2.value.format('YYYY-MM-DD'));
    }
  }

  setCurrentDatepickerDates(datepickerDate1, datepickerDate2) {
    this._pickerService.setCurrentDatepickerDates(datepickerDate1, datepickerDate2);
  }
}
