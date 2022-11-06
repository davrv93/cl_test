import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { AppService } from '../app/app.service';

import { Credit, KhipuTransaction } from '../models/payment.model';
import { PropertyRequest } from '../models/property-request';
/*
 Generated class for the Debt provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class PaymentService extends AppService {

  private endpoint: string;

  constructor(private http: HttpClient) {
    super();
    this.endpoint = this.urlApiLegacy;
  }

  getCredit(propertyRequest: PropertyRequest): Promise<Credit> {
    let url: string = this.endpoint + `/unidad/abono-unidad/${propertyRequest.idAdministrador}/${propertyRequest.idComunidad}/${propertyRequest.idInmueble}`;
    console.log(url);
    return this.http.get(url)
      .toPromise()
      .then(response => response as Credit)
      .catch(this.handleError);
  }

  getKhipuTransactionURL(propertyRequest: PropertyRequest, data: {}): Promise<KhipuTransaction> {
    let url: string = this.endpoint + `/khipu/${propertyRequest.idAdministrador}/${propertyRequest.idComunidad}/${propertyRequest.idInmueble}`;
    console.log(url);
    return this.http.post(url, JSON.stringify(data))
      .toPromise()
      .then(response => response as KhipuTransaction)
      .catch(this.handleError);
  }
}
