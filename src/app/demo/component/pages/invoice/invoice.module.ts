import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [
        InvoiceComponent
    ],
    imports: [
        CommonModule,
        InvoiceRoutingModule,
        ButtonModule
    ]
})
export class InvoiceModule { }
