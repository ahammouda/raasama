import { GridMeta } from './GridMeta';
import { Node } from './Node';
import { TextItem } from './TextItem';
import { RenderItem } from '../common-simulation/RenderItem';
import {isNullOrUndefined} from 'util';

export class TextNode {
  // From trial and error: Text Seems to need a padding of about 4 pixels for text to hit that centerpoint of an svg
  // rect/ellipse
  private static CENTER_PADDING = 4;

  private gridMeta: GridMeta;

  private textItem: TextItem;
  private node: Node;

  private nodeHeight: number; // Text-Node height
  private nodeWidth: number;

  constructor(gridMeta: GridMeta, nodeId: string, x: number, y: number, color: string, textLabel: string,
              width: number = null, isRounded: boolean = false) {
    this.gridMeta = gridMeta;
    this.nodeHeight = 2 * this.gridMeta.COORDINATE_HEIGHT;
    if (isNullOrUndefined(width)) {
      this.nodeWidth = this.getWidth(textLabel);
    } else {
      this.nodeWidth = width;
    }

    this.node = new Node(
      nodeId,
      x + this.gridMeta.X_ORIGIN,
      y + this.gridMeta.Y_ORIGIN,
      this.nodeWidth,
      this.nodeHeight,
      color,
      isRounded
    );

    this.textItem = new TextItem(
      `l-${nodeId}`,
      x + this.gridMeta.X_ORIGIN + this.nodeWidth / 2,
      y + this.gridMeta.Y_ORIGIN + this.nodeHeight / 2 + TextNode.CENTER_PADDING,
      textLabel
    );
  }

  updateColor(color: string): RenderItem {
    return this.node.updateColor(color);
  }

  /**
   * TODO: Want to be able to set this manually as well
   * @param {string} textLabel
   * @returns {number}
   */
  getWidth(textLabel: string) {
    // TODO: This needs to be calculated dynamically from the length of the string within the subscript here
    // (for now, just this hacky method
    const subN = textLabel.includes('}') ? 3 : 0;
    return (textLabel.length - subN) * this.gridMeta.COORDINATE_WIDTH;
  }

  getNode(): Node {
    return this.node;
  }

  /**
   * Get a render item for each element that makes up this object
   */
  getRenderItems(pathId: string = null): Array<RenderItem> {
    const items: Array<RenderItem> = [];
    items.push(
      this.node.getRenderItem()
    );
    const textItems = this.textItem.getRenderItems();
    for (let i = 0; i < textItems.length; i++) {
      items.push(textItems[i]);
    }
    return items;
  }
}
