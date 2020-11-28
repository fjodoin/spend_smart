import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PickerService {

  // Shared variables Date1 Date2 (used for Tracker section, Datepicker)
  private datepickerDate1 = new BehaviorSubject("2020-01-01")
  sharedDatepickerDate1 = this.datepickerDate1.asObservable();
  private datepickerDate2 = new BehaviorSubject("2020-01-01")
  sharedDatepickerDate2 = this.datepickerDate2.asObservable();

  // Shared variable Month (used for Budget section, Monthpicker)
  private monthpickerMonth = new BehaviorSubject("2020-01")
  sharedMonthpickerMonth = this.monthpickerMonth.asObservable();

  constructor() { }

  setCurrentDatepickerDates(dpDate1, dpDate2) {
    console.log('in here -- d1: ', dpDate1, 'd2: ', dpDate2);
    this.datepickerDate1.next(dpDate1);
    this.datepickerDate2.next(dpDate2);
  }

  getCurrentDatepickerDates() {
    return this.datepickerDate1, this.datepickerDate2;
  }

  setCurrentMonthpickerMonth(mpMonth) {
    console.log('m: ', mpMonth);
    this.monthpickerMonth.next(mpMonth);
  }

  getCurrentMonthpickerMonth() {
    return this.monthpickerMonth;
  }


}
