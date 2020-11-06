import { Component, OnInit } from '@angular/core';

const SAMPLE_BARCHART_DATA: any[] = [
  { data: [65, 59, 80, 40, 12, 52, 100, 150, 50, 70, 75, 56], label: 'Fall Spendings'},
  { data: [76, 67, 90, 38, 140, 112, 59, 110, 45, 67, 12, 45], label: 'Winter Spendings'}
];

const SAMPLE_BARCHART_LABELS: string[] = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'];

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor() { }

  public barChartData: any[] = SAMPLE_BARCHART_DATA;
  public barChartLabels: string[] = SAMPLE_BARCHART_LABELS;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  }
  public barChartLegend = true;
  public barChartType = 'bar';
   
  ngOnInit(): void {
  }

}
