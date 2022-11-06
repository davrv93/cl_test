import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParamsOptions, HttpResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { UserModel } from '../models/user-model.model';
import { AppService } from '../app/app.service';
import { map } from 'rxjs/operators';

/**
 @author rodrigo.reyes@kastor.cl
 */
@Injectable()
export class AuthProvider extends AppService {
  email: string;
  password: string;
  token: string;
  urlApi: string;

  /**
   * constructor
   * @param http
   * @param storage
   */
  constructor(private http: HttpClient, private storage: Storage) {
    super();
  }

  /**
   * Local user logout
   * @param token
   */
  localLogout(token: string) {

   
    let headers = new HttpHeaders({ 'Authorization': token ,  'Content-Type': 'application/json'});
    let options =  { headers: headers};
    return this.http.post(this.urlAuthApi + '/users/logout', {}, options).pipe(
      map((res: Response) => res, this.handleError));
  }

  /**
   * Request to send mail with reset password options
   * @param email
   */
  resetPassword(email: string) {
    return this.http.post(this.urlAuthApi + '/users/reset', { email: email })
    .pipe(
      map((res: Response) => res, this.handleError));
  }

  /**
   * Login Local User
   * @param username
   * @param password
   */
  localLogin(username: string, password: string) {
    let headers = new HttpHeaders({  'Content-Type': 'application/json'});
    let options =  { headers: headers};
    return this.http.post(this.urlAuthApi + '/users/login', {
      username: username, password: password
    }, options).pipe(
      map((res: Response) => res, this.handleError));
  }

  /**
   * Find User Data By Id include roleMapping and role definition by user
   * @param userId
   */
  findUserById(userId: string, token: string) {
   
    let headers = new HttpHeaders({ 'Authorization': token ,  'Content-Type': 'application/json'});
    let options =  { headers: headers};

    return this.http.get(this.urlAuthApi + '/users/' + userId + '?filter[include][roles]=role', options)
      .pipe(
      map((res: Response) => res, this.handleError));
  }

  /**
   * Find All Roles Available in Auth api
   * @param token
   */
  findAllRoles(token: string) {
    let headers = new HttpHeaders({ 'Authorization': token ,  'Content-Type': 'application/json'});
    let options =  { headers: headers};
    return this.http.get(this.urlAuthApi + '/Roles/', options)
    .pipe(
      map((res: Response) => res, this.handleError));
  }

  /**
   * Store access token
   * @param accessToken
   */
  storeLocalAccessToken(accessToken: string) {
    this.storage.remove('token')
      .then(() => {
        this.storage.set('token', accessToken)
          .then((token) => this.token = token);
      });
  }

  /**
   *
   * @param token
   * @param user
   */
  updateUser(token: string, user: UserModel) {
    let headers = new HttpHeaders({ 'Authorization': token ,  'Content-Type': 'application/json'});
    let options =  { headers: headers};
    return this.http.put(this.urlAuthApi + '/users/' + user.userId, user, options)
    .pipe(
      map((res: Response) => res, this.handleError));
  }


}
