import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './verification.component.html'
})
export class VerificationComponent {

    constructor(private layoutService: LayoutService) {}

    get filledInput(): boolean {
        return this.layoutService.config.inputStyle === 'filled';
    }

}
