import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    menu: MenuItem[];

    @ViewChild('searchinput') searchInput: ElementRef;

    @ViewChild('menubutton') menuButton!: ElementRef;

    searchActive: boolean;

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.menu = [
            {
                label: 'SaaS',
                routerLink: ['/']
            },
            {
                label: 'Sales',
                routerLink: ['/sales']
            },
            {
                label: 'Blocks',
                routerLink: ['/blocks']
            },
            {
                label: 'Mail',
                routerLink: ['/apps/mail']
            }
        ];
    }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    activateSearch() {
        this.searchActive = true;
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        }, 100);
    }

    deactivateSearch() {
        this.searchActive = false;
    }

    get layoutTheme(): string {
        return this.layoutService.config.layoutTheme;
    }

    get colorScheme(): string {
        return this.layoutService.config.colorScheme;
    }

    get logo(): string {
        const path = 'assets/layout/images/logo-';
        const logo = this.layoutTheme === 'primaryColor' ? 'light.png' : (this.colorScheme === 'light' ? 'dark.png' : 'light.png');
        return path + logo;
    }
}
