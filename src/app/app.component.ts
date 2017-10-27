import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    
    public menuMode: string = 'static';
    
    public menuActive: boolean = false;
    
    public topbarMenuActive: boolean = false;
  
    activeTopbarItem: Element;
    
    onMenuButtonClick(event: Event) {
        this.menuActive = !this.menuActive;
        event.preventDefault();
    }
    
    onTopbarMenuButtonClick(event: Event) {
        this.topbarMenuActive = !this.topbarMenuActive;
        event.preventDefault();
    }
  
    onTopbarItemClick(event: Event, item: Element) {
      if (this.activeTopbarItem === item) {
        this.activeTopbarItem = null; } else {
        this.activeTopbarItem = item; }
      
      event.preventDefault();
    }
}
