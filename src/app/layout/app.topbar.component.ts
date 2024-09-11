import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { TopNavService } from './service/top-nav.service';
import { CenterSelectionService } from '../center-selection.service';
import { Lookup_Center } from '../modules/api/lookups';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  styles: [`
      .search-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.dropdown-wrapper {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
  `]
})
export class AppTopBarComponent implements OnInit {

    menu: MenuItem[] = [];

    @ViewChild('searchinput') searchInput!: ElementRef;

    @ViewChild('menubutton') menuButton!: ElementRef;

    searchActive: boolean = false;

    isAuthenticated: boolean = false;
    userFullName: string ='';
    email: string ='';
    dropdownOptions: any[] = [];
    selectedOption: any;

    constructor(public layoutService: LayoutService, private oktaAuthService: OktaAuthStateService,
       @Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private topNavService:TopNavService,
       private centerSelectionService: CenterSelectionService) {}

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    ngOnInit(): void {
        // Subscribe to authentication state changes
        this.oktaAuthService.authState$.subscribe(
          (result) => {
            this.isAuthenticated = result.isAuthenticated!;
            if (this.isAuthenticated) {
              this.getUserDetails();
            } else {
              // Redirect to login if not authenticated
              this.oktaAuth.signInWithRedirect();
            }
          },
          (error) => {
            console.error('Auth state subscription error:', error);
            // Optionally redirect to login on error
            this.oktaAuth.signInWithRedirect();
          }
        );

        this.topNavService.getLookupCenter().subscribe(
          (centers: Lookup_Center[]) => {
            this.dropdownOptions = centers.map(center => ({
              label: center.name, // Use the name of the center as the label
              value: center.id // Use the id of the center as the value
            }));
          },
          (error) => {
            console.error('Error fetching centers:', error);
          }
        );
        this.selectedOption = this.dropdownOptions[0]?.value;
      }

      onCenterChange(event: any) {
        const selectedCenterId = event.value; // Get the selected center ID
        this.centerSelectionService.setSelectedCenter(selectedCenterId); // Notify the shared service
    }
      
      getUserDetails() {
        if (this.isAuthenticated) {
          this.oktaAuth.getUser().then(
            (res) => {
              this.userFullName = res.name as string;
              this.email = res.email as string;
            },
            (error) => {
              console.error('Error getting user details:', error);
              // Optionally handle the error, e.g., redirect to login
            }
          );
        }
      }

      activateSearch() {
        this.searchActive = true;
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        }, 100);
    }

    deactivateSearch() {
        this.searchActive = false;
    }

      logout() {
        this.oktaAuth.signOut({
          postLogoutRedirectUri: 'http://localhost:4200/auth/login'
        });
      }

    removeTab(event: MouseEvent, item: MenuItem, index: number) {
        this.layoutService.onTabClose(item, index);
        event.preventDefault();
    }

    get layoutTheme(): string {
        return this.layoutService.config().layoutTheme;
    }

    get colorScheme(): string {
        return this.layoutService.config().colorScheme;
    }

    get tabs(): MenuItem[] {
        return this.layoutService.tabs;
    }
}
