export default {
    oidc: {
        clientId: '0oak03qs1d8i6E5nQ5d7', 
        issuer: 'https://dev-10904060.okta.com/oauth2/default', 
        redirectUri: window.location.origin + '/login/callback',
        scopes: ['openid', 'profile', 'email'],
        pkce: true
    }
};