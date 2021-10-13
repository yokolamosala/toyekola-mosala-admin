import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {Product} from '../domain/product';
import {ProductService} from '../service/productservice';
import {AppComponent} from '../../app.component';

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

    chatMessages: any[];

    @ViewChild('chatcontainer') chatContainerViewChild: ElementRef;

    constructor(private productService: ProductService, public app: AppComponent) {}

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

        this.chatMessages = [
            { nth: true, from: 'Jane Cooper', url: 'assets/demo/images/avatar/stephenshaw.png', messages: ['Hey M. hope you are well. Our idea is accepted by the board. '] },
            { nth: false, from: 'Jerome Bell', url: 'assets/demo/images/avatar/ivanmagalhaes.png', messages: ['we did it! 🤠'] },
            { nth: true, from: 'Darlene Robertson', url: 'assets/demo/images/avatar/amyelsner.png', messages: ['I’ll be looking at the process then, just to be sure 🤓 '] },
        ];
    }

    recentSales(event) {
        if (event.value.code === '0') {
            this.products = this.productsThisWeek;
        } else {
            this.products = this.productsLastWeek;
        }
    }

    onChatKeydown(event) {
        if (event.key === 'Enter') {
            const message = event.currentTarget.value;
            const lastMessage = this.chatMessages[this.chatMessages.length - 1];

            if (lastMessage.from) {
                this.chatMessages.push({ nth: false, from: 'Verona',
                    url: 'assets/layout/images/logo-' + (this.app.colorScheme === 'light' ? 'dark' : 'white') + '.png',
                    messages: [message] });
            }
            else {
                lastMessage.messages.push(message);
            }

            if (message.match(/primeng|primereact|primefaces|primevue/i)) {
                this.chatMessages.push({ nth: true, from: 'Ioni Bowcher', url: 'assets/demo/images/avatar/ionibowcher.png', messages: ['Always bet on Prime!'] });
            }

            event.currentTarget.value = '';

            const el = this.chatContainerViewChild.nativeElement;
            setTimeout(() => {
                el.scroll({
                    top: el.scrollHeight,
                    behavior: 'smooth'
                });
            }, 1);
        }
    }
}
