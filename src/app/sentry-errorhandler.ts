import { ErrorHandler } from '@angular/core';
//import Raven from 'raven-js';
import { SENTRY_DSN } from './constants';

/*Raven
  .config(SENTRY_DSN)
  .install();
*/
export class SentryErrorHandler implements ErrorHandler {

  handleError(error: any): void {
    try {
      //Raven.captureException(error);
    } catch (e) {
      console.error(e);
    }
    throw error;
  }
}
