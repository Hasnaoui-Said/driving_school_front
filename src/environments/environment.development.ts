import {NgxLoggerLevel} from "ngx-logger";

export const environment = {

  production: false,
  apiUrl: 'http://localhost:9090/api/v1',

  logLevel: NgxLoggerLevel.DEBUG,
  serverLogLevel: NgxLoggerLevel.ERROR,
};
