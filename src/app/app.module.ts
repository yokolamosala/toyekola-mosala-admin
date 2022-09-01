import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';

// Application Components

import {AppComponent} from './app.component';

// Demo servicess
import {CountryService} from './demo/service/countryservice';
import {CustomerService} from './demo/service/customerservice';
import {EventService} from './demo/service/eventservice';
import {IconService} from './demo/service/iconservice';
import {NodeService} from './demo/service/nodeservice';
import {PhotoService} from './demo/service/photoservice';
import {ProductService} from './demo/service/productservice';

// Application services
import {MenuService} from './layout/app.menu.service';
import {TopbarMenuService} from './layout/app.topbarmenu.service';
import { AppLayoutModule } from './layout/app.layout.module';

@NgModule({
    imports: [
        AppLayoutModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, MenuService, TopbarMenuService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
