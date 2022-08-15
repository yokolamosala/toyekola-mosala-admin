import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeBlocksRoutingModule } from './primeblocks-routing.module';
import { ChipModule } from 'primeng/chip';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { BlockViewer } from './blockviewer/blockviewer.component';
import { BlocksComponent } from './blocks/blocks.component';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        RippleModule,
        ChipModule,
        CheckboxModule,
        FormsModule,
        InputTextModule,
        PasswordModule,
        PrimeBlocksRoutingModule
    ],
    declarations: [BlocksComponent, BlockViewer]
})
export class PrimeBlocksModule { }
