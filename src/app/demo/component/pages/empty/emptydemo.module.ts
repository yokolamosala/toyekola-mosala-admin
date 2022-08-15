import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyDemoRoutingModule } from './emptydemo-routing.module';
import { EmptyDemoComponent } from './emptydemo.component';

@NgModule({
    declarations: [
        EmptyDemoComponent
    ],
    imports: [
        CommonModule,
        EmptyDemoRoutingModule
    ]
})
export class EmptyDemoModule { }
