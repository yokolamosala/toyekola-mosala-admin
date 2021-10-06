import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {Product} from '../domain/product';
import {ProductService} from '../service/productservice';

@Component({
    templateUrl: './dashboardanalytics.component.html',
    styleUrls: ['./tabledemo.scss']
})
export class DashboardAnalyticsComponent implements OnInit {

    orderWeek: any;

    selectedOrderWeek: any;

    products: Product[];

    productsThisWeek: Product[];

    productsLastWeek: Product[];

    analytics: SelectItem[];

    selectedDrop: SelectItem;

    revenueChart: any;

    revenueOptions: any;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data.slice(0, 5));
        this.productService.getProducts().then(data => this.productsThisWeek = data.slice(0, 5));
        this.productService.getProductsMixed().then(data => this.productsLastWeek = data.slice(0, 5));

        this.orderWeek = [
            {name: 'This Week', code: '0'},
            {name: 'Last Week', code: '1'}
        ];

        this.analytics = [
            {label: 'Products', value: 1},
            {label: 'Sales', value: 2},
            {label: 'Customers', value: 3},
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

    recentSales(event) {
        if (event.value.code === '0') {
            this.products = this.productsThisWeek;
        } else {
            this.products = this.productsLastWeek;
        }
    }
}
