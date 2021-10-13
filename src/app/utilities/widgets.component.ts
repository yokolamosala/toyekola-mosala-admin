import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';
import {MenuItem} from 'primeng/api';

@Component({
    templateUrl: './widgets.component.html'
})
export class WidgetsComponent implements OnInit{

    items: MenuItem[];

    revenueChart: any;

    revenueOptions: any;

    constructor(public app: AppComponent) {}

    ngOnInit() {
        this.items = [
            { label: 'Edit', icon: 'pi pi-pencil' },
            { label: 'Delete', icon: 'pi pi-trash' }
        ];

        this.revenueChart = {
            labels: [
                'Online',
                'Retail',
                'N/A'
            ],
            datasets: [{
                data:  [12, 32, 56],
                backgroundColor: [  '#1992D4', '#3E4C59', '#E4E7EB'],
                borderWidth: 0,
            }]
        };

        this.revenueOptions = {
            plugins: {
                legend: {
                    display: false,
                }
            },
            responsive: true,
            cutout: 60
        };
    }
}
