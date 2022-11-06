import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { AppService } from '../app/app.service';
import { Debt } from '../models/debt.model';

import { PropertyRequest } from '../models/property-request';
/*
 Generated class for the Debt provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class DebtService extends AppService {

  private endpoint: string;

  constructor(private http: HttpClient) {
    super();
    this.endpoint = this.urlApiLegacy;
  }

  getByYearMonth(propertyRequest: PropertyRequest): Promise<Debt[]> {
    let url: string = this.endpoint + `/unidad/detalle-deuda-recargo-instalacion/${propertyRequest.idAdministrador}/${propertyRequest.idComunidad}/${propertyRequest.idInmueble}/${propertyRequest.periodo}`;
    console.log(url);
    return this.http.get(url)
      .toPromise()
      .then(response => response as Debt[])
      .catch(this.handleError);
  }

}
