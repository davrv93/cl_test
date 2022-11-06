import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 

@Injectable()
export class Utils {

  constructor(public http: HttpClient) {
    console.log('Hello Utils Provider');
  }

}
