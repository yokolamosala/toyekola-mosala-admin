import {Component, OnInit} from '@angular/core';
import {EventService} from '../service/eventservice';
import {SelectItem, MenuItem} from 'primeng/api';
import {Product} from '../domain/product';
import {ProductService} from '../service/productservice';
import {AppComponent} from '../../app.component';

@Component({
    templateUrl: './dashboardanalytics.component.html',
    styleUrls: ['./tabledemo.scss']
})
export class DashboardAnalyticsComponent implements OnInit {
    ngOnInit() {

    }
}
