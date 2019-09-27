// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    clientID: '08KWAzBmdyjHEJSjarZPQmrJoYJjJ0BC',
    domain: 'hidden-wildflower-3887.auth0.com', // e.g., you.auth0.com
    auth0RedirectUri: 'http://localhost:4200/#/books', // URL to return to after auth0 login
    auth0ReturnTo: 'http://localhost:4200/#/login', // URL to return to after auth0 logout
    scope: 'openid profile',
    type: 'token id_token',
    audience: 'https://hidden-wildflower-3887.auth0.com/api/v2/'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
