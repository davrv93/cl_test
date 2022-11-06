import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { TCEL_API_URL, TCEL_LEGACY_API_URL, AUTH_API_URL } from './constants';
import { SentryErrorHandler } from './sentry-errorhandler';

@Injectable()
export class AppService extends SentryErrorHandler {

  urlApi: string;
  urlApiLegacy: string;
  urlAuthApi: string;

  isDev: boolean = false;

  constructor() {
    super();
    this.urlAuthApi = AUTH_API_URL;
    this.urlApi = TCEL_API_URL;
    this.urlApiLegacy = this.isDev ? 'http://192.168.2.81/index.php' : TCEL_LEGACY_API_URL;
  }

  handleError(error: any): Promise<any> {
    super.handleError(error);
    return Promise.reject(error.message || error);
  }

}
