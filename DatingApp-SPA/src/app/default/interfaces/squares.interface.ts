export interface ISquareCoord {
  rowIndex: number;
  blockIndex: number;
  cameFrom?: ISquareCoord;
  blocked?: boolean;
}
