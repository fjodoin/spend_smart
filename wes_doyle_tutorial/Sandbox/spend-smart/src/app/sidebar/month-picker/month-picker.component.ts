import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SharedDataServices } from '../../services/shared-data.service';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.css']
})
export class MonthPickerComponent implements OnInit {

  constructor(private _sharedDataServices: SharedDataServices) {  }

  date = new Date();
  date1: any;
  date2: any;
  dateArray: Array<string>;

  ngOnInit(): void {
    
    this.date1 = new FormControl(new Date(this.date.getFullYear(), this.date.getMonth(), 1));
    this.date2 = new FormControl(new Date());
    this.dateArray = [this.extractPrettyDate(this.date1.value), this.extractPrettyDate(this.date2.value)];
    this.setData(this.dateArray);
    this._sharedDataServices.sharedDate1.subscribe(sharedDate1 => this.dateArray[0] = sharedDate1);
    this._sharedDataServices.sharedDate2.subscribe(sharedDate2 => this.dateArray[1] = sharedDate2);
  }

  setData(pickerDates): void {
    this._sharedDataServices.setNewDates(pickerDates);
  }

  onDataChange(newDate, picker) {
    const nDate = newDate;
    var pickerDates = ['date1', 'date2'];
    if (picker == 'picker1') {
      const picker1Date = this.extractPrettyDate(nDate);
      pickerDates[0] = picker1Date;
      pickerDates[1] = this.extractPrettyDate(this.date2.value);
    }
    else {
      const picker2Date = this.extractPrettyDate(nDate);
      pickerDates[0] = this.extractPrettyDate(this.date1.value);
      pickerDates[1] = picker2Date;
    }
    this.setData(pickerDates);
  }

  extractPrettyDate(UTCDate) {
    const prettyYear = UTCDate.getFullYear();
    const prettyMonth = UTCDate.getMonth() + 1;
    const prettyDay = UTCDate.getDate();
    const prettyDate = prettyYear + "-" + prettyMonth + "-" + prettyDay
    return prettyDate
  }
}
