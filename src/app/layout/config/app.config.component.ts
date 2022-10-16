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
            {name: 'indigo', lightColor: '#4C63B6', darkColor : '#6A7EC2'},
            {name: 'blue', lightColor: '#1992D4', darkColor : '#3BABE8'},
            {name: 'green', lightColor: '#27AB83', darkColor : '#44D4A9'},
            {name: 'deeppurple', lightColor: '#896FF4', darkColor : '#B1A0F8'},
            {name: 'orange', lightColor: '#DE911D', darkColor : '#E8AB4F'},
            {name: 'cyan', lightColor: '#00B9C6', darkColor : '#58CDD5'},
            {name: 'yellow', lightColor: '#F9C404', darkColor : '#FDDD68'},
            {name: 'pink', lightColor: '#C74B95', darkColor : '#D77FB4'},
            {name: 'purple', lightColor: '#BA6FF4', darkColor : '#D1A0F8'},
            {name: 'lime', lightColor: '#84BD20', darkColor : '#A3D44E'},
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
            if (this.layoutService.config.colorScheme === 'dark') {
                this.layoutService.config.layoutTheme = 'colorScheme';
            }
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
