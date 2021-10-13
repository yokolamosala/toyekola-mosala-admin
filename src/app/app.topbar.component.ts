import {Component, ElementRef, ViewChild} from '@angular/core';
import { AppComponent} from './app.component';
import { AppMainComponent} from './app.main.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    @ViewChild('input1') inputElement1: ElementRef;

    @ViewChild('input2') inputElement2: ElementRef;

    constructor(public app: AppComponent, public appMain: AppMainComponent) {}

    searchFocus(event) {
        if (this.appMain.search) {
            setTimeout(() => {
                this.inputElement1.nativeElement.focus();
                this.inputElement2.nativeElement.focus();
            }, 100);
        }
    }
}
