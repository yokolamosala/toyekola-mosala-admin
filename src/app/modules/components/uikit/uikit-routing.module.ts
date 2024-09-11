import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        
        { path: 'charts', data: { breadcrumb: 'Charts' }, loadChildren: () => import('./charts/chartsdemo.module').then(m => m.ChartsDemoModule) },
        
        { path: 'message', data: { breadcrumb: 'Message' }, loadChildren: () => import('./messages/messagesdemo.module').then(m => m.MessagesDemoModule) },
        { path: 'misc', data: { breadcrumb: 'Misc' }, loadChildren: () => import('./misc/miscdemo.module').then(m => m.MiscDemoModule) },
        { path: 'overlay', data: { breadcrumb: 'Overlay' }, loadChildren: () => import('./overlays/overlaysdemo.module').then(m => m.OverlaysDemoModule) },
        { path: 'panel', data: { breadcrumb: 'Panel' }, loadChildren: () => import('./panels/panelsdemo.module').then(m => m.PanelsDemoModule) },
        { path: 'table', data: { breadcrumb: 'Data' }, loadChildren: () => import('./table/tabledemo.module').then(m => m.TableDemoModule) },
        { path: 'tree', data: { breadcrumb: 'Tree' }, loadChildren: () => import('./tree/treedemo.module').then(m => m.TreeDemoModule) },
        { path: 'menu', data: { breadcrumb: 'Menu' }, loadChildren: () => import('./menus/menus.module').then(m => m.MenusModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UIkitRoutingModule { }
