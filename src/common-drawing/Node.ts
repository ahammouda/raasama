import {RenderItem} from '../common-simulation/RenderItem';

export class Node {
  public id: string; // Css
  public x: number;
  public y: number;
  public rx: number;
  public ry: number;
  public width: number;
  public height: number;

  public color: string;
  public stroke: string;
  public opacity: string;

  constructor(id: string, x: number, y: number, width: number, height: number, color: string, rounded: boolean = false) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    // Hardcoded for now as convenience
    this.stroke = 'black';
    this.opacity = '0.5';
    if (rounded) {
      this.rx = 100;
      this.ry = 100;
    } else {
      this.rx = 0;
      this.ry = 0;
    }
  }

  updateColor(color: string): RenderItem {
    this.color = color;
    const nodeItem = new RenderItem(this.id, `svg`, 'rect');
    nodeItem.addAttr('fill', this.color);
    return nodeItem;
  }

  /**
   * Get a render item from this object to be drawn or transitioned to
   */
  getRenderItem(): RenderItem {
    // Note a rectangle can appear as a circle setting the rx properties to 100;
    const nodeItem = new RenderItem(this.id, `svg`, 'rect');

    nodeItem.addAttr('rx', this.rx);
    nodeItem.addAttr('rx', this.ry);
    nodeItem.addAttr('x', this.x);
    nodeItem.addAttr('y', this.y);
    nodeItem.addAttr('width', this.width);
    nodeItem.addAttr('height', this.height);
    nodeItem.addAttr('fill', this.color);
    nodeItem.addAttr('stroke', this.stroke);
    nodeItem.addAttr('opacity', this.opacity);

    return nodeItem;

  }
}
