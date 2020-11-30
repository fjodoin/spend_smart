import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { appRoutes } from '../routes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TrackerComponent } from './sections/tracker-section/tracker.component';
import { GoalsChartComponent } from './charts/goals-chart/goals-chart.component';
import { CompanyChartComponent } from './charts/company-chart/company-chart.component';
import { TypeChartComponent } from './charts/type-chart/type-chart.component';
import { DateChartComponent } from './charts/date-chart/date-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DatepickerMaterialModule } from './material-module';
import { MatNativeDateModule } from '@angular/material/core';
import { ExpensesDataService } from './service/expenses-data.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BudgetComponent } from './sections/budget-section/budget.component';
import { NavigationService } from './service/navigation.service';
import { MonthpickerComponent } from './monthpicker/monthpicker.component'
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    TrackerComponent,
    GoalsChartComponent,
    CompanyChartComponent,
    TypeChartComponent,
    DateChartComponent,
    DatepickerComponent,
    BudgetComponent,
    MonthpickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    DatepickerMaterialModule,
    MatNativeDateModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    ChartsModule
  ],
  entryComponents: [
    DatepickerComponent
  ],
  providers: [
    NavigationService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [
    AppComponent,
    DatepickerComponent
    ]
})
export class AppModule { }
