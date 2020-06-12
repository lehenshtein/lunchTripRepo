import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BinarySearchService {

  constructor() { }
  search(list: Array<any>, value: number): number {
    let first = 0;
    let last = list.length - 1;
    let found = false;
    let position = -1;
    let middle: number;
    if (!list || list.length <= 0) {
      return position;
    }
    while (!found && first <= last) {
      middle = (first + last) >> 1;
      if (value == list[middle]) {
        found = true;
        position = middle;
      } else if (list[middle] > value) {
        last = middle - 1;
      } else {
        first = middle + 1;
      }
    }
    return position;
  }
}
