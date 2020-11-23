import { Component, OnInit, Input } from '@angular/core';
import _ from 'lodash';
import { THEME_COLORS } from '../../shared/theme.colors';

import { SharedDataServices } from '../../services/shared-data.service';

const theme = 'Bright';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor(private _sharedDataServices: SharedDataServices) {
    this._sharedDataServices.reloadTrackerCalled.subscribe(
      () => {
        this.parseChartData();
      })
  }

  @Input() inputData: any;

  pieChartData: number[];
  colors: any[] = [
    {
      backgroundColor: this.themeColors(theme),
      borderColor: '#333'
    }
  ];
  pieChartLegend = false;
  pieChartLabels: string[];
  pieChartType = 'doughnut';

  ngOnInit() {
    console.log('inputData: ', this.inputData);
    this.parseChartData();
  }

  parseChartData() {
    console.log('parseChartData res: ', this.inputData);
    const allData = this.inputData;
    this.pieChartData = allData.map(x => _.values(x)[1]);
    this.pieChartLabels = allData.map(x => _.values(x)[0]);
  }

  themeColors(setName: string): string[] {
    const c = THEME_COLORS.slice(0).find(set => set.name == setName).colorSet;
    return c;
  }

}
