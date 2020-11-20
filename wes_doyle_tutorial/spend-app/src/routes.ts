import { Routes } from '@angular/router';
import { TrackerComponent } from './app/sections/tracker-section/tracker.component';
import { BudgetComponent } from './app/sections/budget-section/budget.component';


export const appRoutes: Routes = [
  { path: 'tracker', component: TrackerComponent },
  { path: 'budget', component: BudgetComponent },

  //Root redirectTo tracker section
  { path: '', redirectTo: '/tracker', pathMatch: 'full' }
];
