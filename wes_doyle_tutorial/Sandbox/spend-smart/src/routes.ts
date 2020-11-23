import { Routes } from '@angular/router';
import { SectionTrackerComponent } from './app/sections/section-tracker/section-tracker.component';
import { SectionHistoryComponent } from './app/sections/section-history/section-history.component';
import { SectionHealthComponent } from './app/sections/section-health/section-health.component';

export const appRoutes: Routes = [
  { path: 'tracker', component: SectionTrackerComponent },
  { path: 'history', component: SectionHistoryComponent },
  { path: 'health', component: SectionHealthComponent },

  { path: '', redirectTo: '/tracker', pathMatch: 'full' }
];
