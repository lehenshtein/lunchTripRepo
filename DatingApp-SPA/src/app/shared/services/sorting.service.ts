import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor() {
  }

  public swap(arr, firstIndex, secondIndex) {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  }

  public qsort(arr) {
    if (arr.length < 2) {
      return arr;
    }
    const pivot = arr[arr.length >> 1];
    const lesser = [];
    const greater = [];
    arr.splice(arr.indexOf(pivot), 1);
    arr = [pivot].concat(arr);
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) {
        lesser.push(arr[i]);
      } else {
        greater.push(arr[i]);
      }
    }
    return this.qsort(lesser).concat(pivot, this.qsort(greater));
  }

  public badQsort(arr, left = 0, right = arr.length - 1) {
    let index;
    if (arr.length < 2) {
      return arr;
    }
    index = this.partition(arr, left, right);
    if (left < index - 1) {
      this.badQsort(arr, left, index - 1);
    }
    if (index < right) {
      this.badQsort(arr, index, right);
    }
    return arr;
  }

  private partition(arr, left, right) {
    const pivot = (left + right) >> 1;
    let l = left;
    let r = right;
    while (l <= r) {
      while (arr[l] < arr[pivot]) {
        l++;
      }
      while (arr[r] > arr[pivot]) {
        r--;
      }
      if (l <= r) {
        this.swap(arr, l, r);
        l++;
        r--;
      }
    }
    return l;
  }

}
