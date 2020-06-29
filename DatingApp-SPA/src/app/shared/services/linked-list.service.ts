import { Injectable } from '@angular/core';

import {ILinkedList} from '@shared/interfaces/linkedList.interface';

@Injectable({
  providedIn: 'root'
})
export class LinkedListService {

  constructor() { }
  public getLinkedListLength(list: ILinkedList, count = 0, key = 'next') {
    if (list) {
      count++;
      return this.getLinkedListLength(list[key], count);
    }
    else {return count; }
  }
}
