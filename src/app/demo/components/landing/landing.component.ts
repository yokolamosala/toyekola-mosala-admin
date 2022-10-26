import { Component, ViewChild } from '@angular/core';

@Component({
    templateUrl: './landing.component.html'
})
export class LandingComponent { 

    scrollTo(viewChild: HTMLElement) {
        viewChild.scrollIntoView({behavior: 'smooth'});
    }
}
