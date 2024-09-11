import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboard', icon: 'pi pi-home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-desktop', routerLink: ['/'] },
                ]
            },
            {
                label: 'Data', icon: 'pi pi-th-large', routerLink: ['/info'],
                items: [
                    
                    { label: 'Table', icon: 'pi pi-table', routerLink: ['/info/table'] },
                    
                ]
            },
            
        ];
    }
}
