import {Component, OnInit} from '@angular/core';
import {AppLayoutComponent} from '../app.layout.component';
import {LayoutService} from "../service/app.layout.service";
import {MenuService} from "../app.menu.service";

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html'
})
export class AppConfigComponent implements OnInit {

    themes: any[];

    constructor(public appLayout: AppLayoutComponent, public layoutService: LayoutService, public menuService: MenuService) {}

    ngOnInit() {
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

    changeColorScheme(colorScheme: string) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-link');
        const themeLinkHref = themeLink.getAttribute('href');
        const currentColorScheme = 'theme-' + this.layoutService.config.colorScheme;
        const newColorScheme = 'theme-' + colorScheme;
        const newHref = themeLinkHref!.replace(currentColorScheme, newColorScheme);

        this.replaceThemeLink(newHref, 'theme-link', () => {
            this.layoutService.config.colorScheme = colorScheme;
            this.layoutService.onConfigUpdate();
        });
    }

    changeComponentTheme(theme: string) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-link');
        const newHref = themeLink.getAttribute('href')!.replace(this.layoutService.config.theme, theme);


        this.replaceThemeLink(newHref, 'theme-link', () => {
            this.layoutService.config.theme = theme;
            this.layoutService.onConfigUpdate();
        });
    }

    replaceThemeLink(href: string, targetId: string, onComplete?: Function) {
        const id = targetId;
        const targetLink = <HTMLLinkElement>document.getElementById(id);
        const cloneLinkElement = <HTMLLinkElement>targetLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        targetLink.parentNode!.insertBefore(cloneLinkElement, targetLink.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            targetLink.remove();
            cloneLinkElement.setAttribute('id', id);
            onComplete && onComplete();
        });
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
        this.layoutService.showConfigSidebar();
    }

    get colorScheme(): string {
        return this.layoutService.config.colorScheme;
    }

    set colorScheme(_val: string) {
        this.changeColorScheme(_val);
    }

    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
    }

    get menuTheme(): string {
        return this.layoutService.config.layoutTheme;
    }

    set menuTheme(_val: string) {
        this.layoutService.config.layoutTheme = _val;
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

}
