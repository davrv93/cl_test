import { Injectable, Pipe } from '@angular/core';

/*
 Generated class for the CurrencyFormat pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
  name: 'currencyFormat'
})
@Injectable()
export class CurrencyFormat {
  constructor() {
  }

  transform(item: any, replace, replacement): any {
    if (item == null) return '';
    item = item.replace(replace, replacement);
    return item;
  }
}
