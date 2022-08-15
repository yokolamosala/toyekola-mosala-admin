import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {BreadcrumbModule} from 'primeng/breadcrumb';

import {ContextMenuModule} from 'primeng/contextmenu';
import {FullCalendarModule} from '@fullcalendar/angular';
import {InputSwitchModule} from 'primeng/inputswitch';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {StepsModule} from 'primeng/steps';
import {TabMenuModule} from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import {TieredMenuModule} from 'primeng/tieredmenu';

// Application Components

import {AppComponent} from './app.component';



// Demo pages

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
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { RadioButtonModule } from 'primeng/radiobutton';

import { AppLayoutModule } from './layout/app.layout.module';

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin
]);

@NgModule({
    imports: [
        AppLayoutModule,
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        BreadcrumbModule,
        ContextMenuModule,
        InputSwitchModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        PanelModule,
        PanelMenuModule,
        StepsModule,
        TabMenuModule,
        TabViewModule,
        RadioButtonModule,
        TieredMenuModule,

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
