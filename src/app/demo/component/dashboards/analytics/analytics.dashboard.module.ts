import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChartModule } from 'primeng/chart';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { AnalyticsDashboarRoutingModule } from './analytics.dashboard-routing.module';
import { AnalyticsDashboardComponent } from './analytics.dashboard.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        TagModule,
        TooltipModule,
        TableModule,
        InputNumberModule,
        ChartModule,
        DropdownModule,
        FormsModule,
        CalendarModule,
        AvatarModule,
        AvatarGroupModule,
        ProgressBarModule,
        AnalyticsDashboarRoutingModule
    ],
    declarations: [AnalyticsDashboardComponent]
})
export class AnalyticsDashboardModule { }
