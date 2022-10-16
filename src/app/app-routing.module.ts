import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboards/dashboards.module').then(m => m.DashboardsModule) },
                    { path: 'sales', loadChildren: () => import('./demo/components/dashboards/sales/sales.dashboard.module').then(m => m.SalesDashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'ecommerce', loadChildren: () => import('./demo/components/ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
                    { path: 'apps', loadChildren: () => import('./demo/components/apps/apps.module').then(m => m.AppsModule) }
                ]
            },
            { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule) },
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
