import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class NavigationService {

  // Shared Current Page variable (used for datepicker)
  private currentPage = new BehaviorSubject("/");
  sharedCurrentPage = this.currentPage.asObservable();

  // Shared Current Page change function (used for datepicker)
  private currentPageChanged = new Subject<any>();
  currentPageChangedCalled = this.currentPageChanged.asObservable();


  constructor() { }

  setCurrentPage(currPage) {
    this.currentPage.next(currPage);
    this.currentPageChanged.next();
  }

  getCurrentpage() {
    return this.currentPage;
  }
}
