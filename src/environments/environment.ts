// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlServer: 'http://localhost:8080/',
  uriPessoas: 'pessoas',
  uriUsuarios: 'usuarios',
  uriLogin: 'login',
  tempoRecarga: 1000,
  jwtPreffix: 'Bearer ',
  jwtHeader: 'Authentication',
  jwtStorage: 'jwt',
  scctitle: 'SCA - Sistema de Cartão de Autógrafo',
  cpfmask: '000.000.000-00',
  datamask: '00/00/0000',
  dataformat: 'DD/MM/yyyy',
  datalocale: 'pt-BR'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
