export default {
    oidc: {
        clientId: '0oaiy98lldKLzwVQy5d7',
        issuer: 'https://dev-74279040.okta.com/oauth2/default', 
        redirectUri: window.location.origin + '/login/callback',
        scopes: ['openid', 'profile', 'email'],
        pkce: true
    }
};