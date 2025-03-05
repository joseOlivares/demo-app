import {
    provideKeycloak,
    createInterceptorCondition,
    IncludeBearerTokenCondition,
    INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
    withAutoRefreshToken,
    AutoRefreshTokenService,
    UserActivityService
  } from 'keycloak-angular';

  import {environment} from '../../../environments/environment';
  

  const ssoCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
    urlPattern: /^http:\/\/demo-pipeline-sescobar-dev\.apps\.rm3\.7wse\.p1\.openshiftapps\.com\/.*$/,
    httpMethods: ['POST'],
  });

  
  export const provideKeycloakAngular = () =>
    provideKeycloak({
      config: {
        realm: environment.realm,
        url: environment.url,
        clientId: environment.clientId
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        redirectUri: window.location.origin + '/',
        checkLoginIframe: false
      },
      features: [
        withAutoRefreshToken({
          onInactivityTimeout: 'logout',
          sessionTimeout: 60000,
        }),
      ],
      providers: [
        AutoRefreshTokenService,
        UserActivityService,
        {
          provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
          useValue: [ssoCondition],
        }
      ]
    });