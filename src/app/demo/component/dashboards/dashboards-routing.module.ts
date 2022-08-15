import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', loadChildren: () => import('./sales/sales.dashboard.module').then(m => m.SalesDashboardModule) },
        { path: 'dashboard-analytics', loadChildren: () => import('./analytics/analytics.dashboard.module').then(m => m.AnalyticsDashboardModule) },


    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
