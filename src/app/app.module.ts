import { NgModule} from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { OKTA_CONFIG, OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';
import myAppConfig from './config/my-app-config';
import OktaAuth from '@okta/okta-auth-js';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

const oktaAuth = new OktaAuth({
    issuer: myAppConfig.oidc.issuer,
    clientId: myAppConfig.oidc.clientId,
    redirectUri: myAppConfig.oidc.redirectUri,
    scopes: myAppConfig.oidc.scopes,
    pkce: true
  });
  
@NgModule({
    imports: [
        AppLayoutModule,
        AppRoutingModule,
        OktaAuthModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        { provide: OKTA_CONFIG, useValue: { oktaAuth }},
        {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
