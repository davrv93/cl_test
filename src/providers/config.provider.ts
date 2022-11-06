import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { PropertyRequest } from '../models/property-request';
import { AppService } from '../app/app.service';
import { PaymentType } from '../models/payment-type.model';
import { map } from 'rxjs/operators';
/**
 * @author rodrigo.reyes@kastor.cl
 */
@Injectable()
export class ConfigProvider extends AppService {

  constructor(public http: HttpClient) {
    super();
  }

  /**
   * obtiene las configuraciones asociadas a los medios de pago disponibles en la comunidad
   * @param propertyRequest
   */
  paymentMethodConfigByComunidad(propertyRequest: PropertyRequest) {
    return this.http.get(this.urlApiLegacy + '/comunidades/medios-pago/configuracion/' + propertyRequest.idComunidad + '/' + propertyRequest.idAdministrador)
    .pipe(
      map((res: Response) => res, this.handleError));
  }

  paymentTypeConfigByComunidad(propertyRequest: PropertyRequest): Promise<PaymentType> {
    let url: string = this.urlApiLegacy + '/comunidad/tipo-pago-tcel/' + propertyRequest.idAdministrador + '/' + propertyRequest.idComunidad;
    console.log(url);
    return this.http.get(url,{responseType:'json'})
      .toPromise()
      .then(response => response as PaymentType)
      .catch(this.handleError);
  }
}
