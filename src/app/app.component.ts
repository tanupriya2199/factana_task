import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  canvas: any;
  canvas2: any;
  ctx: any;
  ctx2: any;
  doughnutCanvas: any;
  doughnutChart: Chart;
  salesChart: Chart;
  barChart: Chart;
  doughnutCtx: any;
  barChartCanvas: any;
  barChartCtx: any;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {

  }




  ngAfterViewInit() {
    Feather.replace();
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f9fbfd';
    // sales Chart

    this.canvas = document.getElementById('salesChart');
    this.ctx = this.canvas.getContext('2d');
    this.salesChart = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: ['Oct 1', 'Oct 3', 'Oct 6', 'Oct 9', 'Oct 12', 'Oct 15', 'Oct 18', 'Oct 21', 'Oct 24', 'Oct 27', 'Oct 30'],
        datasets: [
          {
            label: "",
            borderWidth: 3,
            fill: false,
            backgroundColor: "#2C7BE5",
            borderColor: "#2C7BE5",
            lineTension: 0.4,
            pointRadius: 0,
            data: [2, 10, 5, 15, 10, 20, 15, 25, 20, 30, 25],
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
      },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            ticks: {
              autoSkip: true,
              maxTicksLimit: 12,
              fontSize: 12,
            },
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true,
              labelString: ""
            }
          }],
          yAxes: [{
            ticks: {
              autoSkip: true,
              maxTicksLimit: 4,
              fontSize: 12,
            },
            scaleLabel: {
              display: true,
              labelString: "$"
            }
          }],
        }
      }
    });

    // doughnut chart
    this.doughnutCanvas = document.getElementById('trafficChart');
    this.doughnutCtx = this.doughnutCanvas.getContext('2d');
    this.doughnutChart = new Chart(this.doughnutCtx, {
      type: 'doughnut',
      data: {
          labels: [
            'Direct',
            'Referral',
            'Organic'
        ],
        datasets: [{
          data: [60, 10, 30],
          backgroundColor: [
            '#2C7BE5',
            '#A6C5F7',
            '#D2DDEC'
          ],
          borderWidth: 5,
        }]
      },
      options: {
        responsive: false,
        display: true,
        cutoutPercentage: 80,
        legend: {
          display: false
      },
      // tooltips: {
      //     callbacks: {
      //        label: function(tooltipItem) {
      //               return tooltipItem.yLabel;
      //        }
      //     }
      // }
      }

    })

    // Bar Chart

    this.barChartCanvas = document.getElementById('conversionsChart');
    this.barChartCtx = this.barChartCanvas.getContext('2d');
    this.barChart = new Chart(this.barChartCtx, {
      type: 'bar',
      data: {
        labels: ['Oct 1', 'Oct 2', 'Oct 3', 'Oct 4', 'Oct 5', 'Oct 6', 'Oct 7', 'Oct 8', 'Oct 9', 'Oct 10', 'Oct 11', 'Oct 12'],
        datasets: [
          {
            label: "",
            borderWidth: 1,
            backgroundColor: '#2C7BE5',
            data: ['25', '20', '30', '22', '17', '20', '18', '26', '28', '26', '20', '32']
          }
        ]
      },
      options: {
        responsive: false,
        display: true,
        // cornerRadius: 20,
        legend: {
          display: false
      },
        curvature: 1,
        scales: {
          xAxes: [{
            barPercentage: 0.4,
            ticks: {
              autoSkip: true,
              maxTicksLimit: 12,
              fontSize: 12,
            },
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true,
              labelString: ""
            }
          }],
          yAxes: [{
            ticks: {
              autoSkip: true,
              maxTicksLimit: 4,
              fontSize: 12,
            },
            scaleLabel: {
              display: true,
              labelString: "%"
            }
          }],
        }
      }

    })

  }

  onClickDirect() {
    this.doughnutChart.data.datasets[0].data = [30, 50, 20];
    this.doughnutChart.update();
  }

  onClickAll() {
    this.doughnutChart.data.datasets[0].data = [60, 10, 30];
    this.doughnutChart.update();
  }

  onClickSalesAll() {
    this.salesChart.data.datasets[0].data = [2, 10, 5, 15, 10, 20, 15, 25, 20, 30, 25];
    this.salesChart.update();
  }

  onClickSalesDirect() {
    this.salesChart.data.datasets[0].data = [10, 15, 35, 19, 20, 25, 45, 20, 30, 35, 19];
    this.salesChart.update();
  }

  onClickSalesOrganic() {
    this.salesChart.data.datasets[0].data = [5, 10, 25, 5, 30, 20, 35, 25, 10, 30, 25];
    this.salesChart.update();
  }

  onToggleConversion(event) {
    if (event.target.checked == true) {
      let newDataset = {
        label: "",
        backgroundColor: '#D2DDEC',
        borderColor: '#D2DDEC',
        borderWidth: 1,
        data: ['10', '20', '30', '22', '30', '20', '40', '26', '28', '26', '20', '32']
      }
      this.barChart.data.datasets.push(newDataset);
      this.barChart.update();

    } else {
      this.barChart.data.datasets.pop();
      this.barChart.update();
    }
  }
}
