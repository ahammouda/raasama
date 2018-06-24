import { GridMeta } from './GridMeta';
import { Node } from './Node';
import { TextItem } from './TextItem';
import { RenderItem } from '../common-simulation/RenderItem';
import {isNullOrUndefined} from 'util';
import {GridPoint} from './GridPoint';
import { straightLine } from '../common-drawing/staticFunctions';

export class BarBox {
  // From trial and error: Text Seems to need a padding of about 4 pixels for text to hit that centerpoint of an svg
  // rect/ellipse
  private static CENTER_PADDING = 4;

  private static HEIGHT_MULTIPLIER = 4; // Some more systematic way of deriving this should be encoded

  public id: string;
  private gridMeta: GridMeta;

  private textItemKeys: Array<TextItem> = [];
  private textItemValues: Array<TextItem> = [];

  private node: Node;
  private headeNode: Node;

  private nodeHeight: number; // Text-Node height

  private x: number;
  private y: number;

  private barX: number;
  private barPoints: Array<GridPoint> = []; //

  constructor(gridMeta: GridMeta, color: string, headerNode: Node = null) {
    if ( isNullOrUndefined(headerNode) ) {
      throw new Error('Stand alone BarBox not implemented yet!');
    }

    this.gridMeta = gridMeta;
    this.nodeHeight = this.gridMeta.COORDINATE_HEIGHT * BarBox.HEIGHT_MULTIPLIER;

    this.headeNode = headerNode;
    this.id = `b-${this.headeNode.id}`;

    this.x = this.gridMeta.X_ORIGIN + this.headeNode.x;
    this.y = this.gridMeta.Y_ORIGIN + this.headeNode.y  + this.headeNode.height;

    this.node = new Node(
      this.id,
      this.x,
      this.y,
      this.headeNode.width,
      this.nodeHeight,
      color
    );
  }

  addRow(key: string, value: string) {
    /* TODO: Eventually resize height dynamically from the text that's drawn here */
    const buffer = 4;
    this.barX = this.x + this.gridMeta.COORDINATE_WIDTH * (1 + key.length);

    this.textItemKeys.push(
      new TextItem(
        `k-${this.node.id}`,
        this.x + buffer,
        this.y + (0.75 * this.gridMeta.COORDINATE_HEIGHT) + BarBox.CENTER_PADDING,
        key,
        'start'
      )
    );
    this.textItemValues.push(
      new TextItem(
        `k-${this.node.id}`,
        this.barX + buffer,
        this.y + (0.75 * this.gridMeta.COORDINATE_HEIGHT) + BarBox.CENTER_PADDING,
        value,
        'start'
      )
    );
  }

  getFirstRowY(): number {
    return this.textItemValues[0].y;
  }

  getFirstRowX(): number {
    return this.x + this.headeNode.width;
  }

  initBar() {
    this.barPoints.push({
      x: this.barX,
      y: this.y
    });
    this.barPoints.push({
      x: this.barX,
      y: this.y + this.nodeHeight
    });
  }

  getRenderItems(): Array<RenderItem> {
    const items: Array<RenderItem> = [];
    if (this.barPoints.length === 0) {
      this.initBar();
    }
    const barItem: RenderItem = new RenderItem(this.id, 'svg', 'path');

    barItem.addAttr('d', straightLine(this.barPoints));
    barItem.addAttr('stroke', 'blue');
    barItem.addAttr('stroke-width', 1);
    barItem.addAttr('fill', 'none');

    items.push(barItem);
    items.push(
      this.node.getRenderItem()
    );

    for (let i = 0; i < this.textItemKeys.length; i++){
      items.push(
        this.textItemKeys[i].getRenderItem()
      );
      items.push(
        this.textItemValues[i].getRenderItem()
      );
    }
    return items;
  }
}
