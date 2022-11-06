import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParamsOptions, HttpResponse } from '@angular/common/http';
 import { SummaryRequest } from '../models/summary/summary-request';
import { AppService } from '../app/app.service';
import { map } from 'rxjs/operators';

/**
 * @author: rodrigo.reyes@kastor.cl
 */
@Injectable()
export class TransactionSummaryProvider extends AppService {

  constructor(public http: HttpClient) {
    super();
  }

  /**
   * obtiene datos de cartola de pago por inmueble
   * @param summaryRequest
   */
  getCartolaPagoByInmueble(summaryRequest: SummaryRequest) {
    return this.http.get(this.urlApiLegacy + `/unidad/cartola-unidad-pago/${summaryRequest.inmueble.idAdministrador}/${summaryRequest.inmueble.idComunidad}/${summaryRequest.inmueble.idInmueble}/${summaryRequest.dateFrom}/${summaryRequest.dateTo}`)
    .pipe(
      map((res: Response) => res, this.handleError));
  }

  /**
   * obtiene datos de cartola de deuda por inmueble
   * @param summaryRequest
   */
  getCartolaDeudaByInmueble(summaryRequest: SummaryRequest) {
    return this.http.get(this.urlApiLegacy + `/unidad/cartola-unidad-deuda/${summaryRequest.inmueble.idAdministrador}/${summaryRequest.inmueble.idComunidad}/${summaryRequest.inmueble.idInmueble}/${summaryRequest.dateFrom}/${summaryRequest.dateTo}`)
    .pipe(
      map((res: Response) => res, this.handleError));
  }

  /**
   * obtiene el saldo de ambas cartolas
   * @param summaryRequest 
   */
  getSaldoCartolaByInmueble(summaryRequest: SummaryRequest) {
    return this.http.get(this.urlApiLegacy + `/unidad/cartola-unidad-total-saldo/${summaryRequest.inmueble.idAdministrador}/${summaryRequest.inmueble.idComunidad}/${summaryRequest.inmueble.idInmueble}/${summaryRequest.dateFrom}/${summaryRequest.dateTo}`)
      .pipe(
        map((res: Response) => res, this.handleError));
  }

}
