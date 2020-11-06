import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SectionTrackerComponent } from './sections/section-tracker/section-tracker.component';
import { SectionHistoryComponent } from './sections/section-history/section-history.component';
import { SectionHealthComponent } from './sections/section-health/section-health.component';
import { appRoutes } from '../routes';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SectionTrackerComponent,
    SectionHistoryComponent,
    SectionHealthComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
