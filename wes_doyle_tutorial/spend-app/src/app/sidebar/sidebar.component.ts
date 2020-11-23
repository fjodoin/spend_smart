import { Component, AfterViewInit } from '@angular/core';
import { NavigationService } from '../service/navigation.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {

  constructor(
    private _navigationService: NavigationService,
  ) { }

  ngAfterViewInit(): void {
  }

  trackerClicked() {
    this._navigationService.setCurrentPage("/tracker");
  }

  budgetClicked() {
    this._navigationService.setCurrentPage("/budget");
  }
}
