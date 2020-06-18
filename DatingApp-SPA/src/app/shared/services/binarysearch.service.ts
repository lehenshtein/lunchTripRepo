import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BinarySearchService {

  constructor() { }
  search(list: Array<number | string>, value: number | string): number {
    let first = 0;
    let last = list.length - 1;
    let found = false;
    let position = -1;
    let middle: number;
    if (!list || list === []) {
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
  recursiveSearch (list: Array<number | string>, value: number | string, first = 0, last?: number): number {
    if (!last && last !== 0) last = list.length -1;

    if (list === [] || first > last) return -1;

    let middle = (first + last) >> 1;
    if (value === list[middle]){
      return middle
    } else if(value < list[middle]){
      return this.recursiveSearch(list, value, first, middle -1);
    } else {
      return this.recursiveSearch(list, value, middle + 1, last)
    }
  }
}
