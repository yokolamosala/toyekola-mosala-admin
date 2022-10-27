import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-code',
    template: `
        <pre class="surface-ground p-3 border-round oveflow-auto"><code class="-mt-4 p-0 line-height-3 block" [ngStyle]="{'font-family': 'monaco, Consolas, monospace'}"><ng-content></ng-content></code></pre>
    `
})
export class AppCodeComponent {

}

@NgModule({
    imports: [CommonModule],
    exports: [AppCodeComponent],
    declarations: [AppCodeComponent]
})
export class AppCodeModule { }
