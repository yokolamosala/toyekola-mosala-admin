import {Component, OnInit} from '@angular/core';
import {AppLayoutComponent} from '../app.layout.component';
import {LayoutService} from "../service/app.layout.service";
import {MenuService} from "../app.menu.service";

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html'
})
export class AppConfigComponent implements OnInit {

    layoutColorAll: any[];

    themes: any[];

    tempLayoutColor = 'white';

    constructor(public appLayout: AppLayoutComponent, public layoutService: LayoutService, public menuService: MenuService) {}

    ngOnInit() {
        this.layoutColorAll = [
            {name: 'white', color: '#ffffff'},
            {name: 'blue', color: 'linear-gradient(147.38deg, #4C96B6 0%, #19496C 100%)'},
            {name: 'cyan', color: 'linear-gradient(147.38deg, #4CB6A3 0%, #19536C 100%)'},
            {name: 'deepblue', color: 'linear-gradient(147.38deg, #4C63B6 0%, #19216C 100%)'},
            {name: 'purple', color: 'linear-gradient(147.38deg, #9E768F 0%, #656C98 100%)'},
            {name: 'yellow', color: 'linear-gradient(147.38deg, #C57F6A 0%, #DABE67 100%)'},
            {name: 'deeppurple', color: 'linear-gradient(147.38deg, #684789 0%, #647DEE 100%)'},
            {name: 'orange', color: 'linear-gradient(147.38deg, #BD9279 0%, #BE5757 100%)'},
            {name: 'green', color: 'linear-gradient(147.38deg, #45947A 0%, #A6BF5D 100%)'},
            {name: 'mauve', color: 'linear-gradient(147.38deg, #455B94 0%, #BFAA5D 100%)'},
            {name: 'dusk', color: 'linear-gradient(147.38deg, #7B3F81 0%, #5DB3BF 100%)'},
            {name: 'ocean', color: 'linear-gradient(147.38deg, #455B94 0%, #90B967 100%)'},
            {name: 'deepgreen', color: 'linear-gradient(147.38deg, #767C50 0%, #344B6F 100%)'},
        ];

        this.themes = [
            {name: 'indigo', color1: '#4C63B6', color2 : '#6A7EC2'},
            {name: 'blue', color1: '#1992D4', color2 : '#3BABE8'},
            {name: 'green', color1: '#27AB83', color2 : '#44D4A9'},
            {name: 'deeppurple', color1: '#896FF4', color2 : '#B1A0F8'},
            {name: 'orange', color1: '#DE911D', color2 : '#E8AB4F'},
            {name: 'cyan', color1: '#00B9C6', color2 : '#58CDD5'},
            {name: 'yellow', color1: '#F9C404', color2 : '#FDDD68'},
            {name: 'pink', color1: '#C74B95', color2 : '#D77FB4'},
            {name: 'purple', color1: '#BA6FF4', color2 : '#D1A0F8'},
            {name: 'lime', color1: '#84BD20', color2 : '#A3D44E'},
        ];
    }

    changeTheme(theme) {
        this.layoutService.config.theme = theme;
        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
        const href = 'assets/theme/' + theme + '/theme-' + this.layoutService.config.colorScheme + '.css';

        this.replaceLink(themeLink, href);
    }

    changeColorScheme(scheme) {
        this.layoutService.config.colorScheme = scheme;
        this.layoutService.config.layoutColor = scheme === 'dark' ? scheme : this.tempLayoutColor;

        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
        const layoutHref = 'assets/layout/css/layout-' + (scheme === 'dark' ? scheme : this.tempLayoutColor) + '.css';
        this.replaceLink(layoutLink, layoutHref);

        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
        const themeHref = 'assets/theme/' + this.layoutService.config.theme + '/theme-' + scheme + '.css';
        this.replaceLink(themeLink, themeHref, this.appLayout['refreshChart']);
    }


    changeLayoutColor(name) {
        this.tempLayoutColor = name;
        this.layoutService.config.layoutColor = name;

        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
        const layoutHref = 'assets/layout/css/layout-' + name + '.css';
        this.replaceLink(layoutLink, layoutHref);
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    replaceLink(linkElement, href, callback?) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);

            if (callback) {
                callback();
            }
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);

                if (callback) {
                    callback();
                }
            });
        }
    }

    onConfigButtonClick() {
        this.appLayout.configActive = true;
        this.appLayout.configClick = true;
    }

    get layoutColor(): string {
        return this.layoutService.config.layoutColor
    }

    set layoutColor(_val: string) {
        this.layoutService.config.layoutColor = _val;
    }

    get colorScheme(): string {
        return this.layoutService.config.colorScheme
    }

    set colorScheme(_val: string) {
        this.layoutService.config.colorScheme = _val;
    }

    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
    }

    get scale(): number {
        return this.layoutService.config.scale;
    }

    set scale(_val: number) {
        this.layoutService.config.scale = _val;
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

    get inputStyle(): string {
        return this.layoutService.config.inputStyle;
    }

    set inputStyle(_val: string) {
        this.layoutService.config.inputStyle = _val;
    }

    get ripple(): boolean {
        return this.layoutService.config.ripple;
    }

    set ripple(_val: boolean) {
        this.layoutService.config.ripple = _val;
    }

    get theme(): string {
        return this.layoutService.config.theme;
    }

    set theme(_val: string) {
        this.layoutService.config.theme = _val;
    }

    replaceThemeLink(href: string, onComplete: Function) {
        const id = 'theme-css';
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute('id', id);
            onComplete();
        });
    }

    decrementScale() {
        this.scale--;
        this.applyScale();
    }

    incrementScale() {
        this.scale++;
        this.applyScale();
    }

    applyScale() {
        document.documentElement.style.fontSize = this.scale + 'px';
    }
}
