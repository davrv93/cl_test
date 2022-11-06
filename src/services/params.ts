import { Injectable } from '@angular/core';

@Injectable()
export class Params {

  public params: any;

  constructor() {
  }

  setParams(params) {
    this.params = params;
  }

  getParams() {
    return this.params;
  }
}
