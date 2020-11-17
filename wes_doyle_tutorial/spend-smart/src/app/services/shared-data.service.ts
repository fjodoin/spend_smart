import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedDataServices {
  private date1 = new BehaviorSubject('2020-11-01');
  private date2 = new BehaviorSubject('2020-11-10');

  sharedDate1 = this.date1.asObservable();
  sharedDate2 = this.date2.asObservable();

  constructor() { }

  setNewDates(newDates) {
    console.log('from shared:', newDates);
    this.date1.next(newDates[0]);
    this.date2.next(newDates[1]);
  }

}
