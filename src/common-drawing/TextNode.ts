import { GridMeta } from './GridMeta';
import { Node } from './Node';
import { TextItem } from './TextItem';
import { RenderItem } from '../common-simulation/RenderItem';

export class TextNode {
  // From trial and error: Text Seems to need a padding of about 4 pixels for text to hit that centerpoint of an svg
  // rect/ellipse
  private static CENTER_PADDING = 4;

  private gridMeta: GridMeta;

  private textItem: TextItem;
  private node: Node;

  private nodeHeight: number; // Text-Node height
  private nodeWidth: number;

  constructor(gridMeta: GridMeta, nodeId: string, x: number, y: number, color: string, textLabel: string, isRounded: boolean = false) {
    this.gridMeta = gridMeta;
    this.nodeHeight = 2 * this.gridMeta.COORDINATE_HEIGHT;
    this.nodeWidth = this.getWidth(textLabel);

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

  getWidth(textLabel: string) {
    return textLabel.length * this.gridMeta.COORDINATE_WIDTH + this.gridMeta.COORDINATE_WIDTH;
  }

  getNode(): Node {
    return this.node;
  }

  /**
   * Get a render item for each element that makes up this object
   */
  getRenderItems(pathId: string = null): Array<RenderItem> {
    const nodeItem = this.node.getRenderItem();
    const textItem = this.textItem.getRenderItem();
    return [nodeItem, textItem];
  }
}
