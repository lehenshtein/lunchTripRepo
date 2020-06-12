import { Component, OnInit } from '@angular/core';
import {BinarySearchService} from "../shared/services/binarysearch.service";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  private list = [1,3,6,9,12,15,17,19,29,31];

  constructor(private binarySearchService: BinarySearchService) { }

  ngOnInit(): void {
    console.log('Binary search index: ', this.binarySearchService.search(this.list, 222));
    // console.log(this.list[this.binarySearchService.search(this.list, 6)])
  }

}
