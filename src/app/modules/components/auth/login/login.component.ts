import { Component, Inject, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import myAppConfig from '../../../../config/my-app-config'
import OktaAuth from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaSignIn from '@okta/okta-signin-widget';

@Component({
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

	oktaSignin: any;

	constructor(private layoutService: LayoutService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
		this.oktaSignin = new OktaSignIn({
			logo: 'assets/layout/images/yekola.png',
			baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
			clientId: myAppConfig.oidc.clientId,
			redirectUri: myAppConfig.oidc.redirectUri,
			authParams: {
				pkce: true,  
				issuer: myAppConfig.oidc.issuer,
				scopes: myAppConfig.oidc.scopes,
				responseMode: 'fragment'
			},
			useInteractionCodeFlow: false
		});
	}

	get filledInput(): boolean {
		return this.layoutService.config().inputStyle === 'filled';
	}

	ngOnInit():void {
		this.oktaSignin.remove();

		this.oktaSignin.renderEl({
			el: '#okta-sign-in-widget'},
			(response: any) => {
				if (response.status == 'SUCCESS'){
					this.oktaAuth.signInWithRedirect();
				}
			},
			(error: any) => {
				throw error;
			}
		);
	}

}
