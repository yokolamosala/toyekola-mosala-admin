import {Component, OnInit} from '@angular/core';
import {EventService} from '../service/eventservice';
import {SelectItem, MenuItem} from 'primeng/api';
import {Product} from '../domain/product';
import {ProductService} from '../service/productservice';
import {AppComponent} from '../../app.component';
import {PrimeIcons} from 'primeng/api';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardDemoComponent implements OnInit {

    overviewChart: any;

    overviewChartOptions: any;

    overviewWeek: any;

    selectedOverviewWeek: any;

    timelineEvents: any[];








    cities: SelectItem[];

    products: Product[];

    chartData: any;

    events: any[];

    selectedCity: any;

    items: MenuItem[];

    fullcalendarOptions: any;

    constructor(public app: AppComponent, private productService: ProductService, private eventService: EventService) { }

    ngOnInit() {
        this.overviewChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            datasets: [
                {
                    data: [2, 1, 0.5, 0.6, 0.5, 1.3, 1],
                    borderColor: [
                        '#FADB5F',
                    ],
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: 'transparent',
                    type: 'line',
                    fill: false,
                },
                {
                    data: [4.88, 3, 6.2, 4.5, 2.1, 5.1, 4.1],
                    backgroundColor: '#E4E7EB',
                    fill: true,
                    borderRadius: 10,
                    borderSkipped: 'top bottom',
                    barPercentage: 0.3
                }
            ]
        };

        this.overviewChartOptions = {
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: true,
            hover: {
                mode: 'index'
            },
            scales: {
                y: {
                    max: 7,
                    min: 0,
                    ticks: {
                        stepSize: 0,
                        callback: function(value, index) {
                            if (index === 0) {
                                return value;
                            }
                            else {
                                return value + 'k';
                            }
                        }
                    },
                    grid: {
                        borderDash: [2, 2],
                        drawBorder: false,
                    },
                },
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        beginAtZero: true,
                    }
                }
            }
        };

        this.overviewWeek = [
            {name: 'Last Week', code: '0'},
            {name: 'This Week', code: '1'}
        ];

        this.timelineEvents = [
            {status: 'Ordered', date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg'},
            {status: 'Processing', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7'},
            {status: 'Shipped', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800'},
            {status: 'Delivered', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B'}
        ];




        this.productService.getProducts().then(data => this.products = data);
        this.eventService.getEvents().then(events => {this.events = events; });

        this.cities = [];
        this.cities.push({label: 'Select City', value: null});
        this.cities.push({label: 'New York', value: {id: 1, name: 'New York', code: 'NY'}});
        this.cities.push({label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}});
        this.cities.push({label: 'London', value: {id: 3, name: 'London', code: 'LDN'}});
        this.cities.push({label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}});
        this.cities.push({label: 'Paris', value: {id: 5, name: 'Paris', code: 'PRS'}});

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#FFC107'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#03A9F4'
                }
            ]
        };

        this.items = [
            {label: 'Save', icon: 'pi pi-check'},
            {label: 'Update', icon: 'pi pi-refresh'},
            {label: 'Delete', icon: 'pi pi-trash'}
        ];

        this.fullcalendarOptions = {
        };
    }

    changeOverviewWeek(event) {
        const dataSet1 = [
            [2, 1, 0.5, 0.6, 0.5, 1.3, 1],
            [4.88, 3, 6.2, 4.5, 2.1, 5.1, 4.1]
        ];
        const dataSet2 = [
            [3, 2.4, 1.5, 0.6, 4.5, 3.3, 2],
            [3.2, 4.1, 2.2, 5.5, 4.1, 3.6, 3.5],
        ];

        if (event.value.code === '1') {
            this.overviewChart.datasets[0].data = dataSet2[parseInt('0')];
            this.overviewChart.datasets[1].data = dataSet2[parseInt('1')];
        } else {
            this.overviewChart.datasets[0].data = dataSet1[parseInt('0')];
            this.overviewChart.datasets[1].data = dataSet1[parseInt('1')];
        }
    }
}
