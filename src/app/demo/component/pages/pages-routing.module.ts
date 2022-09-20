import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'aboutus', loadChildren: () => import('./aboutus/aboutus.module').then(m => m.AboutUsModule) },
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'faq', loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule) },
        { path: 'help', loadChildren: () => import('./help/help.module').then(m => m.HelpModule) },
        { path: 'invoice', loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
