import * as d3 from 'd3';
import * as _ from 'lodash';

import { TextNode } from './TextNode';
import { GridMeta } from './GridMeta';
import { GridPoint } from './GridPoint';
import { RenderItem } from '../common-simulation/RenderItem';
import {isNullOrUndefined} from 'util';

export class GridTable {
  private static COLOR_DEFAULT = '#497c7b';
  private static COLOR_HIGHLIGHT = '#12ede8';
  private static COLOR_HEADER = '#405a84';

  public id: string;
  private gridMeta: GridMeta;

  private nRows: number;
  private nCols: number;

  private x: number;
  private y: number;

  private hRow: number;
  private hCol: number;

  private gridPoints: TextNode[][] = [];

  private headerString: string;
  private headerNode: TextNode;

  constructor(gridMeta: GridMeta, nRows: number, nCols: number, x: number, y: number, colSymbols: Array<string>,
              headerStr: string) {
    if (colSymbols.length !== nCols) {
      throw Error('Need to provide a symbol for every column');
    }
    this.gridMeta = gridMeta;
    this.nRows = nRows;
    this.nCols = nCols;
    this.x = x;
    this.y = y;

    let hOffSet = 0;
    if (headerStr) {
      this.headerString = headerStr;
      hOffSet += this.gridMeta.COORDINATE_HEIGHT * 2;
      // TODO: Pass in some kind of seeder id to prefix everything with
      this.headerNode = new TextNode(
        this.gridMeta, 'n-head',
        this.x,
        this.y,
        GridTable.COLOR_HIGHLIGHT,
        this.headerString, this.gridMeta.COORDINATE_WIDTH * 2 * this.nCols
      );
    }

    for (let i = 0; i < this.nRows; i++) {
      this.gridPoints.push([]);
      for (let j = 0; j < this.nCols; j++) {
        this.gridPoints[i].push(
          new TextNode(
            this.gridMeta, `n-${i}-${j}`,
            this.x + this.gridMeta.COORDINATE_WIDTH * 2 * j,
            this.y + this.gridMeta.COORDINATE_HEIGHT * 2 * i + hOffSet,
            GridTable.COLOR_DEFAULT, `${colSymbols[j]}_{${i}}`
          )
        );
      }
    }
  }

  highlightPoint(row: number, col: number) {
    if (!isNullOrUndefined(this.hCol)) {
      this.gridPoints[this.hRow][this.hCol].updateColor(GridTable.COLOR_DEFAULT);
    }
    this.hRow = row;
    this.hCol = col;
    this.gridPoints[this.hRow][this.hCol].updateColor(GridTable.COLOR_HIGHLIGHT);
  }

  getRenderItems(): Array<RenderItem> {
    let items: Array<RenderItem> = [];

    for (let i = 0; i < this.nRows; i++) {
      for (let j = 0; j < this.nCols; j++) {
        items = _.concat(items, this.gridPoints[i][j].getRenderItems());
      }
    }
    if (!isNullOrUndefined(this.headerNode)) {
      items = _.concat(items, this.headerNode.getRenderItems());
    }
    return items;
  }
}
