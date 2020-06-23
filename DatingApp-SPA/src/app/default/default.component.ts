import { Component, OnInit } from '@angular/core';

import {BinarySearchService} from '@shared/services/binarysearch.service';
import {LinkedListService} from '@shared/services/linked-list.service';
import {SortingService} from '@shared/services/sorting.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  private list = [12, 17, 0, 15, 29, 31, 1, 3, 6, 9];
  private stringList = ['hi', 'Aner', 'Lambda', 'hoba', 'f'];
  private linkedList = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: null
        }
      }
    }
  };

  constructor(
    private binarySearchService: BinarySearchService,
    private sortingService: SortingService,
    private linkedListService: LinkedListService
  ) { }

  ngOnInit(): void {
  }
  public sum(arr: Array<number>): number { // суммирование элементов массива, при каждой
    if (arr.length <= 0) {return 0; }         // итерации, которого, кол-во элементов массива уменьшается на 1
    if (arr.length === 1) { return arr[0]; }
    else {
      const firstEl = arr[0];
      arr.shift();
      return firstEl + this.sum(arr);
    }
  }

  public arrayActions() {
    console.log('Quick sort: ', this.sortingService.qsort(this.list));
    console.log('badQsort sort: ', this.sortingService.badQsort([6,3,8,5,2,9,5,23,76,11,87,5]));

    this.list.sort((a, b) => a - b);
    const newStringArray = this.stringList.map(el => el.toLowerCase()).sort();
    console.log(this.list);
    console.log(newStringArray);
    console.log('Binary search index: ', this.binarySearchService.search(this.list, 31));
    console.log('Recursive search index: ', this.binarySearchService.recursiveSearch(newStringArray, 'f'));
    console.log('Array sum with removing first array el: ', this.sum([1, 2, 3]));
    console.log('Get linked list elements: ',this.linkedListService.getLinkedListLength(this.linkedList));
  }

}
