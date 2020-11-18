import { Injectable } from '@angular/core';
import moment from 'moment';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable()
export class SharedDataServices {
  private date1 = new BehaviorSubject('2020-11-01');
  private date2 = new BehaviorSubject('2020-11-10');

  sharedDate1 = this.date1.asObservable();
  sharedDate2 = this.date2.asObservable();

  private reloadTrackerCaller = new Subject<any>();
  reloadTrackerCalled = this.reloadTrackerCaller.asObservable();

  constructor() { }

  setNewDates(newDates) {
    this.date1.next(moment(newDates[0]).format('YYYY-MM-DD'));
    this.date2.next(moment(newDates[1]).format('YYYY-MM-DD'));
    //console.log('date1, date2', this.date1.value, this.date2.value);
    this.reloadTrackerCaller.next();
  }
}
