import { RenderItem } from '../common-simulation/RenderItem';

export class TextItem {
  public id: string;
  public x: number;
  public y: number;
  textAnchor: string;
  textContent: string;

  constructor(id: string, x: number, y: number, textContent: string, textAnchor: string = 'middle') {
    this.id = id;
    this.x = x;
    this.y = y;
    this.textAnchor = textAnchor;
    this.textContent = textContent;
  }

  getRenderItem(): RenderItem {
    // TODO: if this.textContent has 1 or more sub/super scripts, this will need to be more complicated
    //  --> With multiple render items appended to each other
    const textItem = new RenderItem(this.id, 'svg', 'text');
    textItem.addAttr('x', this.x);
    textItem.addAttr('y', this.y);
    textItem.addAttr('text-anchor', this.textAnchor);
    textItem.setText( this.textContent );
    return textItem;
  }
}
