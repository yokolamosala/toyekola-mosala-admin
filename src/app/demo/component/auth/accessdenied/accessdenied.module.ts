import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessdeniedRoutingModule } from './accessdenied-routing.module';
import { AccessdeniedComponent } from './accessdenied.component';


@NgModule({
    imports: [
        CommonModule,
        AccessdeniedRoutingModule,

    ],
    declarations: [AccessdeniedComponent]
})
export class AccessdeniedModule { }
