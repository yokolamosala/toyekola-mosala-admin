import {Component, OnDestroy, Renderer2} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, Subscription} from 'rxjs';
import {MenuService} from './app.menu.service';
import {LayoutService} from "./service/app.layout.service";
import {TopbarMenuService} from "./app.topbarmenu.service";
import {PrimeNGConfig} from "primeng/api";
import {AppComponent} from "../app.component";

@Component({
    selector: 'app-layout',
    templateUrl: './app.layout.component.html'
})
export class AppLayoutComponent implements OnDestroy {

    overlayMenuOpenSubscription: Subscription;

    menuOutsideClickListener: any;

    constructor(private menuService: MenuService, public layoutService: LayoutService, public renderer: Renderer2, public router: Router, private topbarmenuService: TopbarMenuService, private primengConfig: PrimeNGConfig, public app: AppComponent) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {

                    this.layoutService.state.profileSidebarVisible = false;
                    this.layoutService.state.overlayMenuActive = false;
                    this.layoutService.state.staticMenuMobileActive = false;
                    this.layoutService.state.menuHoverActive = false;
                    this.menuService.reset();
                    this.menuOutsideClickListener();
                    this.menuOutsideClickListener = null;
                    this.unblockBodyScroll();

                    if (this.layoutService.state.staticMenuMobileActive) {
                        this.blockBodyScroll();
                    }

                });
            }
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.unblockBodyScroll();
            });
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    get containerClass() {
        return {
            'layout-slim': this.layoutService.config.menuMode === 'slim',
            'layout-static': this.layoutService.config.menuMode === 'static',
            'layout-mobile-active': this.layoutService.state.overlayMenuActive,
            'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
            'p-input-filled': this.layoutService.config.inputStyle === 'filled'
        }
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    menuClick: boolean;

    topbarItemClick: boolean;

    menuHoverActive = false;

    topbarMenuActive = false;

    activeTopbarItem: Element;

    searchClick = false;

    search = false;

    configActive: boolean;

    configClick: boolean;

    topbarMenuClick = false;

    onLayoutClick() {
        if (!this.topbarItemClick) {
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
            this.staticMenuMobileActive = false;
        }

        if (this.topbarMenuClick) {
            if (this.isSlim()) {
                this.menuHoverActive = false;
            }
        }
        if (!this.topbarMenuClick) {
            this.topbarmenuService.reset();
        }

        if (!this.searchClick) {
            this.search = false;
        }

        this.searchClick = false;
        this.configClick = false;
        this.menuClick = false;
        this.topbarItemClick = false;
        this.topbarMenuClick = false;
    }

    onMenuButtonClick(event: Event) {
        this.layoutService.onMenuToggle();
    }

    onMenuClick() {
        this.menuClick = true;
    }

    onTopbarMenuClick() {
        this.topbarMenuClick = true;
    }

    onTopbarItemClick(event: Event, item: Element) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item;
        }

        if (item.className === 'search-item') {
            this.search = !this.search;
            this.searchClick = !this.searchClick;
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
        return this.layoutService.config.menuMode === 'slim';
    }

    isStatic() {
        return this.layoutService.config.menuMode === 'static';
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    get menuMode(): string {
        return this.layoutService.config.menuMode;
    }

    set menuMode(_val: string) {
        this.layoutService.config.menuMode = _val;
        if (this.layoutService.isSlim()) {
            this.menuService.reset();
        }
    }
}

