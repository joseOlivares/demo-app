import {
    provideKeycloak,
    createInterceptorCondition,
    IncludeBearerTokenCondition,
    INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
    withAutoRefreshToken,
    AutoRefreshTokenService,
    UserActivityService
  } from 'keycloak-angular';
  
  const localhostCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
    urlPattern: /^(http:\/\/localhost:4200)(\/.*)?$/i
  });

  const ssoCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
    urlPattern: /^(https:\/\/sso-sescobar-dev.apps.rm3.7wse.p1.openshiftapps.com)(\/.*)?$/i
  });
  
  export const provideKeycloakAngular = () =>
    provideKeycloak({
      config: {
        realm: 'Test',
        url: 'https://sso-sescobar-dev.apps.rm3.7wse.p1.openshiftapps.com/auth',
        clientId: 'AngularApp'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        redirectUri: window.location.origin + '/',
      },
      features: [
        withAutoRefreshToken({
          onInactivityTimeout: 'logout',
          sessionTimeout: 300000,
        }),
      ],
      providers: [
        /**/
        AutoRefreshTokenService,
        UserActivityService,
        {
          provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
          useValue: [localhostCondition, ssoCondition],
          multi: true
        }
          
      ]
    });