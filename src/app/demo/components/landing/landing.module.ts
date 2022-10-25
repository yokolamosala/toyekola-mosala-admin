import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';

@NgModule({
    imports: [
        CommonModule,
        LandingRoutingModule,
        ButtonModule,
        RouterModule,
        StyleClassModule,
        RippleModule
    ],
    declarations: [LandingComponent]
})
export class LandingModule { 

    constructor(private router: Router) {}
}
