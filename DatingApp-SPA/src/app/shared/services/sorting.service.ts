import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor() { }
  public sum(arr: Array<number>): number { // суммирование элементов массива, при каждой
    if (arr.length <= 0) {return 0; }         // итерации, которого, кол-во элементов массива уменьшается на 1
    if (arr.length === 1) { return arr[0]; }
    else {
      const firstEl = arr[0];
      arr.shift();
      return firstEl + this.sum(arr);
    }
  }

}
