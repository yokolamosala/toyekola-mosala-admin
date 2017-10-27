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
    
    menuClick: boolean;
    
    menuButtonClick: boolean;
    
    topbarMenuClick: boolean;
    
    topbarMenuButtonClick: boolean;

    onMenuButtonClick(event: Event) {
        this.menuButtonClick = true;
        this.menuActive = !this.menuActive;
        event.preventDefault();
    }
    
    onTopbarMenuButtonClick(event: Event) {
        this.topbarMenuButtonClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;
        event.preventDefault();
    }
  
    onTopbarItemClick(event: Event, item: Element) {
        this.topbarMenuButtonClick = true;
        
        if(this.activeTopbarItem === item)
            this.activeTopbarItem = null;
        else
            this.activeTopbarItem = item; 
      
        event.preventDefault();
    }
    
    onTopbarMenuClick() {
        this.topbarMenuClick = true;
    }
    
    onLayoutClick() {
        if(this.isMobile() || this.menuMode === 'overlay' || this.menuMode === 'popup') {
            if(!this.menuButtonClick && !this.menuClick) {
                this.menuActive = false;
            }
        }
        
        if(!this.topbarMenuButtonClick && !this.topbarMenuClick) {
            this.topbarMenuActive = false;
        }
        
        this.menuButtonClick = false;
        this.menuClick = false;
        this.topbarMenuButtonClick = false;
        this.topbarMenuClick = false;
    }
    
    onMenuClick() {
        this.menuClick = true;
    }
    
    isMobile() {
        return window.innerWidth < 1025;
    }
}
