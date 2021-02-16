import { Component } from '@angular/core';
import { MenuService } from './app.menu.service';
import { PrimeNGConfig } from 'primeng/api';
import { AppComponent } from './app.component';

@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html'
})
export class AppMainComponent {

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    menuClick: boolean;

    menuHoverActive = false;

    topbarMenuActive = false;

    activeTopbarItem: Element;

    topbarMenuButtonClick: boolean;

    configActive: boolean;

    configClick: boolean;

    constructor(private menuService: MenuService, private primengConfig: PrimeNGConfig, public app: AppComponent) { }

    onLayoutClick() {
        if (!this.topbarMenuButtonClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }

        if (this.configActive && !this.configClick) {
            this.configActive = false;
        }

        if (!this.menuClick) {
            if (this.isSlim()) {
                this.menuService.reset();
            }

            this.menuHoverActive = false;
        }

        this.configClick = false;
        this.menuClick = false;
        this.topbarMenuButtonClick = false;
    }

    onMenuButtonClick(event: Event) {
        this.menuClick = true;

        if (!this.isMobile()) {
            this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
        } else {
            this.staticMenuMobileActive = !this.staticMenuMobileActive;
        }

        event.preventDefault();
    }

    onMenuClick() {
        this.menuClick = true;
    }

    onTopbarMenuButtonClick(event: Event) {
        this.topbarMenuButtonClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;
        event.preventDefault();
    }

    onTopbarItemClick(event: Event, item: Element) {
        this.topbarMenuButtonClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item;
        }
        event.preventDefault();
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    onRippleChange(event) {
        this.app.ripple = event.checked;
        this.primengConfig = event.checked;
    }

    onConfigClick(event) {
        this.configClick = true;
    }

    isMobile() {
        return window.innerWidth < 1025;
    }

    isSlim() {
        return this.app.menuMode === 'slim';
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }
}
