import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    
    public menuMode: string = 'horizontal';
    
    public menuActive: boolean = true;
    
    public topbarMenuActive: boolean = false;
  
    activeTopbarItem: Element;
    
    menuClick: boolean;
    
    menuButtonClick: boolean;
    
    topbarMenuClick: boolean;
    
    topbarMenuButtonClick: boolean;
    
    resetMenu: boolean;
    
    menuHoverActive: boolean;

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
        if(!this.menuButtonClick && !this.menuClick) {
            if(this.menuMode === 'horizontal') {
                this.resetMenu = true;
            }
            
            if(this.isMobile() || this.menuMode === 'overlay' || this.menuMode === 'popup') {
                this.menuActive = false;
            }
            
            this.menuHoverActive = false;
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
        this.resetMenu = false;
    }
    
    isMobile() {
        return window.innerWidth < 1025;
    }
    
    isHorizontal() {
        return this.menuMode === 'horizontal';
    }
}
