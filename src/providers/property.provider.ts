import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParamsOptions, HttpResponse } from '@angular/common/http';
import { PropertyRequest } from '../models/property-request';
import { AppService } from '../app/app.service';
import { map } from 'rxjs/operators';

/*
 Generated class for the Property provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class PropertyProvider extends AppService {

  constructor(public http: HttpClient) {
    super();
  }

  /**
   * @deprecated
   * @param email
   * @param token
   */
  propertiesByEmail(email: any, token: string) {
    let headers = new HttpHeaders({ 'Authorization': token ,  'Content-Type': 'application/json'});
    let options =  { headers: headers};
    return this.http.get(this.urlApi + '/Inmuebles?filter[where][email]=' + email + '&filter[include][comunidad]=administrador', options)
      .pipe(
      map((res: Response) => res, this.handleError));
  }
  propertiesAndRolByEmail2(email: any, token: string) {
    let headers = new HttpHeaders({ 'Authorization': token ,  'Content-Type': 'application/json'});
    let options =  { headers: headers};
    return this.http.get(this.urlApi + '/InmueblesUser?filter[where][email]=' + email + '&filter[include][inmueble]', options)
     ;
  }
  /**
   *
   * @param email
   * @param token
   */
  propertiesAndRolByEmail(email: any, token: string) {
    let headers = new HttpHeaders({ 'Authorization': token ,  'Content-Type': 'application/json'});
    let options =  { headers: headers};
    return this.http.get(this.urlApi + '/InmueblesUser?filter[where][email]=' + email + '&filter[include][inmueble]', options)
      .pipe(
      map((res: Response) => res, this.handleError));
  }


  /**
   * obtiene informacion general de la comunidad y del administrador asociado a un inmueble particular
   * @param idComunidad
   * @param idAdministrador
   */
  comunidadById(idComunidad, idAdministrador) {
    return this.http.get(this.urlApiLegacy + '/comunidades/info/' + idComunidad + '/' + idAdministrador)
      .pipe(
      map((res: Response) => res, this.handleError));
  }

  /**
   * Obtiene las unidades asociadas a un inmueble en K2
   * @param propertyRequest
   */
  unidadesByInmueble(propertyRequest: PropertyRequest) {
    return this.http.get(this.urlApiLegacy + '/unidades-by-inmueble/' + propertyRequest.idComunidad + '/' + propertyRequest.idAdministrador + '/' + propertyRequest.idInmueble)
      .pipe(
      map((res: Response) => res, this.handleError));
  }

  /**
   * Obtiene cobros adicionales por inmueble
   * @param propertyRequest
   */
  cobrosAdicionalesByInmueble(propertyRequest: PropertyRequest) {
    return this.http.get(this.urlApiLegacy + '/inmuebles/cobros-adicionales/' + propertyRequest.idComunidad + '/' + propertyRequest.idAdministrador + '/' + propertyRequest.idInmueble + '/' + propertyRequest.anio + '/' + propertyRequest.mes)
      .pipe(
      map((res: Response) => res, this.handleError));
  }

  /**
   * Obtiene total de cargos por arriendo de instalaciones
   * @param propertyRequest
   */
  totalArriendoInstalacionesByInmueble(propertyRequest: PropertyRequest) {
    return this.http.get(this.urlApiLegacy + '/inmuebles/total-arriendo-instalaciones/' + propertyRequest.idComunidad + '/' + propertyRequest.idAdministrador + '/' + propertyRequest.idInmueble)
      .pipe(
      map((res: Response) => res, this.handleError));
  }

  /**
   * obtiene el ultimo pago del inmueble
   * @param propertyRequest
   */
  ultimoPagoByInmueble(propertyRequest: PropertyRequest) {
    return this.http.get(this.urlApiLegacy + '/inmuebles/ultimo-pago/' + propertyRequest.idComunidad + '/' + propertyRequest.idAdministrador + '/' + propertyRequest.idInmueble + '/' + propertyRequest.fecha)
      .pipe(
      map((res: Response) => res, this.handleError));
  }

  /**
   * Obtiene la deuda total por inmueble a la fecha
   * @param propertyRequest
   */
  deudaByInmueble(propertyRequest: PropertyRequest) {
    return this.http.get(this.urlApiLegacy + '/inmuebles/deuda-total/' + propertyRequest.idComunidad + '/' + propertyRequest.idAdministrador + '/' + propertyRequest.idInmueble + '/' + propertyRequest.anio + '/' + propertyRequest.mes)
      .pipe(
      map((res: Response) => res, this.handleError));
  }

  /**˙
   * Obtiene alicuota total por inmueble
   * @param propertyRequest
   */
  alicuotaByInmueble(propertyRequest: PropertyRequest) {
    return this.http.get(this.urlApiLegacy + '/inmuebles/alicuota/' + propertyRequest.idComunidad + '/' + propertyRequest.idAdministrador + '/' + propertyRequest.idInmueble)
      .pipe(
      map((res: Response) => res, this.handleError));
  }

  /**
   * Obtiene monto de prorrateo por inmueble para la unidad principal
   * @param propertyRequest
   */
  montoProrrateoByInmueble(propertyRequest: PropertyRequest) {
    return this.http.get(this.urlApiLegacy + '/inmuebles/monto-prorrateo/' + propertyRequest.idComunidad + '/' + propertyRequest.idAdministrador + '/' + propertyRequest.idInmueble + '/' + propertyRequest.anio + '/' + propertyRequest.mes)
      .pipe(
      map((res: Response) => res, this.handleError));
  }

  /**
   * Obtiene usuario principal por inmueble
   * @param propertyRequest
   */
  usuarioByInmueble(propertyRequest: PropertyRequest) {
    return this.http.get(this.urlApiLegacy + '/inmuebles/usuario/' + propertyRequest.idComunidad + '/' + propertyRequest.idAdministrador + '/' + propertyRequest.idInmueble)
      .pipe(
      map((res: Response) => res, this.handleError));
  }
  
  /**
   * Obtiene usuario principal por inmueble
   * @param propertyRequest
   */
  usuarioByInmuebleEach(idComunidad, idAdministrador, idInmueble) {
    return this.http.get(this.urlApiLegacy + '/inmuebles/usuario/' + idComunidad + '/' + idAdministrador + '/' + idInmueble)
      .pipe(
      map((res: Response) => res, this.handleError));
  }

  /**
   * Obtiene los fondos por comunidad
   * @param propertyRequest
   */
  fondosByComunidad(propertyRequest: PropertyRequest) {
    return this.http.get(this.urlApiLegacy + '/comunidades/fondos/' + propertyRequest.idComunidad + '/' + propertyRequest.idAdministrador)
      .pipe(
      map((res: Response) => res, this.handleError));
  }

  ultimoProrrateoByComunidad(propertyRequest: PropertyRequest) {
    return this.http.get(this.urlApiLegacy + '/comunidades/ultimo-prorrateo/' + propertyRequest.idComunidad + '/' + propertyRequest.idAdministrador)
      .pipe(
      map((res: Response) => res, this.handleError));
  }


}
