import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

import {ISquareCoord} from '@app/default/interfaces/squares.interface';

@Component({
  selector: 'app-squares',
  templateUrl: './squares.component.html',
  styleUrls: ['./squares.component.css']
})
export class SquaresComponent implements OnInit {
  message = '';
  steps = 0;
  startPoint = false;
  endPoint = false;
  startBlockCoords: ISquareCoord;
  endBlockCoords: ISquareCoord;

  settedRows = 15;
  settedBlocks = 15;

  checkedNeightbours = {};
  rows = [];
  @ViewChild('field') field: ElementRef;


  constructor(private rd: Renderer2) { }

  ngOnInit(): void {
    this.buildSquares();
  }

  buildSquares() {
    for (let i = 0; i < this.settedRows; i++) {
      this.rows.push([]);
      for (let j = 0; j < this.settedBlocks; j++) {
        const random = Math.floor(Math.random() * Math.floor(5));
        this.rows[i].push({iterated: false, way: false, blocked: random === 0});
      }
    }
  }

  onSelectBlock(rowIndex: number, blockIndex: number, blocked: boolean, block: HTMLDivElement) {
    if (!this.startPoint && !this.endPoint) {
      this.onSelectStart(rowIndex, blockIndex, blocked, block);
      return;
    }
    if (this.startPoint && !this.endPoint) {
      this.onSelectEnd(rowIndex, blockIndex, blocked, block);
      return;
    }
  }
  private onSelectStart(rowIndex: number, blockIndex: number, blocked: boolean, block: HTMLDivElement) {
    if (blocked) {
      return;
    }
    this.rd.addClass(block, 'start');
    this.startPoint = true;
    this.startBlockCoords = {rowIndex, blockIndex, cameFrom: null};
  }
  private onSelectEnd(rowIndex: number, blockIndex: number, blocked: boolean, block: HTMLDivElement) {
    if (blocked) {
      return;
    }
    this.rd.addClass(block, 'end');
    this.endPoint = true;
    this.endBlockCoords = {rowIndex, blockIndex};
    this.search([this.startBlockCoords]);
  }

  private search(coords: Array<ISquareCoord>) {
    this.checkedNeightbours[this.stringifyCoords(coords[0])] = null;
    while (coords.length) {
      if (!this.rows[coords[0].rowIndex][coords[0].blockIndex].blocked &&
        !this.checkedNeightbours[this.stringifyCoords(coords[0])]) {// check if coords checked and not blocked
        if (this.checkDestination(coords[0], this.endBlockCoords)){ // chick if this is what we r looking for
          this.message = `Found! ${coords[0].rowIndex} ${coords[0].blockIndex}.`;
          this.showWay(coords[0]);
          return;
        }
        if (!this.checkDestination(coords[0], this.endBlockCoords)) {
          this.checkedNeightbours[this.stringifyCoords(coords[0])] = coords[0];
          this.rows[coords[0].rowIndex][coords[0].blockIndex].iterated = true;
        }
        const neighbours = this.getNeighbours(coords[0].rowIndex, coords[0].blockIndex);
        if (neighbours.length) {
          neighbours.forEach(el => coords.push(el));
        }
        coords.shift();
      } else {
        coords.shift();
      }
    }
    return this.message = 'Way is blocked =(';
  }
  private checkDestination(startBlockCoords: ISquareCoord, endBlockCoords: ISquareCoord): boolean {
    return startBlockCoords.rowIndex === endBlockCoords.rowIndex &&
      startBlockCoords.blockIndex === endBlockCoords.blockIndex;
  }
  private showWay(end) {
    if (end.cameFrom) {
      this.steps++;
      const row = end.cameFrom.rowIndex;
      const block = end.cameFrom.blockIndex;
      this.rows[row][block].way = true;
      return this.showWay(this.checkedNeightbours[this.stringifyCoords(end.cameFrom)]);
    }
    return;
  }
  private stringifyCoords(coords) {
    return JSON.stringify({rowIndex: coords.rowIndex, blockIndex: coords.blockIndex});
  }

  private getNeighbours(rowIndex: number, blockIndex: number): Array<ISquareCoord> {
    const neighbours: Array<ISquareCoord> = [];
    const topNeighbour = this.getTopNeighbour(rowIndex);
    const bottomNeighbour = this.getBottomNeighbour(rowIndex);
    const leftNeighbour = this.getLeftNeighbour(blockIndex);
    const rightNeighbour = this.getRightNeighbour(blockIndex);
    if (topNeighbour || topNeighbour === 0) {
      neighbours.push({rowIndex: topNeighbour, blockIndex, cameFrom: {rowIndex, blockIndex}});
    }
    if (bottomNeighbour || bottomNeighbour === 0) {
      neighbours.push({rowIndex: bottomNeighbour, blockIndex, cameFrom: {rowIndex, blockIndex}});
    }
    if (leftNeighbour || leftNeighbour === 0) {
      neighbours.push({rowIndex, blockIndex: leftNeighbour, cameFrom: {rowIndex, blockIndex}});
    }
    if (rightNeighbour || rightNeighbour === 0) {
      neighbours.push({rowIndex, blockIndex: rightNeighbour, cameFrom: {rowIndex, blockIndex}});
    }
    return neighbours;
  }

  private getTopNeighbour(rowIndex: number): number {
    if (rowIndex === 0) { return; }
    return --rowIndex;
  }
  private getBottomNeighbour(rowIndex: number): number {
    if (rowIndex === this.settedRows - 1) { return; }
    return ++rowIndex;
  }
  private getLeftNeighbour(blockIndex: number): number {
    if (blockIndex === 0) { return; }
    return --blockIndex;
  }
  private getRightNeighbour(blockIndex: number): number {
    if (blockIndex === this.settedBlocks - 1) { return; }
    return ++blockIndex;
  }
  reset() {
    this.steps = 0;
    this.message = '';
    this.startPoint = false;
    this.endPoint = false;
    this.startBlockCoords = null;
    this.endBlockCoords = null;
    this.checkedNeightbours = [];
    const children = Array.from(this.field.nativeElement.children);
    children.forEach((row: HTMLDivElement) => {
      Array.from(row.children).forEach((square: HTMLDivElement) => {
        this.rd.removeClass(square, 'start');
        this.rd.removeClass(square, 'end');
      });
    });
    this.rows.forEach(row => row.forEach(block => {
      block.iterated = false;
      block.way = false;
    }));
  }

  recreate() {
    this.reset();
    this.rows = [];
    this.buildSquares();
  }
}
