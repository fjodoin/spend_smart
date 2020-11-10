import { Component, OnInit, Input } from '@angular/core';
import _ from 'lodash';
import { THEME_COLORS } from '../../shared/theme.colors';

const theme = 'Bright';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  @Input() inputData: any;

  pieChartData: number[];
  colors: any[] = [
    {
      backgroundColor: this.themeColors(theme),
      borderColor: '#333'
    }
  ];

  pieChartLabels: string[];
  pieChartType = 'doughnut';

  ngOnInit() {
    this.parseChartData(this.inputData);
  }

  parseChartData(res: any) {
    const allData = res.slice(0, 5);
    console.log(allData);
    this.pieChartData = allData.map(x => _.values(x)[1]);
    this.pieChartLabels = allData.map(x => _.values(x)[0]);
  }

  themeColors(setName: string): string[] {
    const c = THEME_COLORS.slice(0).find(set => set.name == setName).colorSet;
    return c;
  }

}
