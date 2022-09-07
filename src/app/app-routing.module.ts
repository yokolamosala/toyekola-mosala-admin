import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/component/dashboards/dashboards.module').then(m => m.DashboardsModule) },
                    { path: 'analytics', loadChildren: () => import('./demo/component/dashboards/analytics/analytics.dashboard.module').then(m => m.AnalyticsDashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/component/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/component/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/component/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'pages', loadChildren: () => import('./demo/component/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/component/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'ecommerce', loadChildren: () => import('./demo/component/ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
                    { path: 'apps', loadChildren: () => import('./demo/component/apps/apps.module').then(m => m.AppsModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/component/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/component/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', loadChildren: () => import('./demo/component/notfound/notfound.module').then(m => m.NotfoundModule) },
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
