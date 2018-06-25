import * as d3 from 'd3';

import { TextNode } from './TextNode';
import { GridMeta } from './GridMeta';
import { GridPoint } from './GridPoint';
import { RenderItem } from '../common-simulation/RenderItem';

export class GridTable {
  private static COLOR_DEFAULT = 'green';
  private static COLOR_HIGHLIGHT = 'purple';

  public id: string;
  private gridMeta: GridMeta;

  private nRows: number;
  private nCols: number;

  private gridPoints: Node[][];

  constructor(gridMeta: GridMeta, nRows: number, nCols: number, x: number, y: number) {
    this.gridMeta = gridMeta;
    this.nRows = nRows;
    this.nCols = nCols;
  }

  highlightPoint(row: number, col: number) {
  }
}
