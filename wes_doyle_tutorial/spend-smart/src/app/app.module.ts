import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { appRoutes } from '../routes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SectionTrackerComponent } from './sections/section-tracker/section-tracker.component';
import { SectionHistoryComponent } from './sections/section-history/section-history.component';
import { SectionHealthComponent } from './sections/section-health/section-health.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { PaginationComponent } from './pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';
import { ExpensesDataServices } from './services/expenses-data.service';
import { SharedDataServices } from './services/shared-data.service';
import { SortDirective } from './directive/sort.directive';
import { MonthPickerComponent } from './sidebar/month-picker/month-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MonthMaterialModule } from './material-module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SectionTrackerComponent,
    SectionHistoryComponent,
    SectionHealthComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    PaginationComponent,
    SortDirective,
    MonthPickerComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MonthMaterialModule,

  ],
  entryComponents: [
    MonthPickerComponent
  ],
  providers: [
    ExpensesDataServices,
    SharedDataServices,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [
    AppComponent,
    MonthPickerComponent,
  ]
})
export class AppModule { }
