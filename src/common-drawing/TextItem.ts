import * as _ from 'lodash';

import { RenderItem } from '../common-simulation/RenderItem';

export class TextItem {
  private static SUB_RE: RegExp = /\_\{\w*\}/;
  private static SUPER_RE: RegExp = /\^\{\w*\}/;
  private static SUB_SUPER: RegExp = /\_\{\w*\}|\^\{\w*\}/;
  private static FONT_SIZE = 16; // Just making default explicit
  private static SUBSCRIPT_SIZE = 10;
  private static GRID_META_COORD_WIDTH = 22; // TODO: Make this an input as long as this variable is useful

  public id: string;
  public x: number;
  public y: number;
  textAnchor: string;
  textContent: string;

  incX: number;
  textRenderItems: Array<RenderItem>;

  constructor(id: string, x: number, y: number, textContent: string, textAnchor: string = 'middle') {
    this.id = id;
    this.x = x;
    this.y = y;
    this.textAnchor = textAnchor;
    this.textContent = textContent;
    this.incX = 0;
  }

  cleanString(str: string) {
    return str.replace('_', '')
      .replace('^', '')
      .replace('{', '')
      .replace('}', '');
  }

  /**
   * Note this will fail if someone tries to add a sub,sub script or a super/superscript
   * @param {string} searchString
   * @returns {Array<RenderItem>}
   */
  getSubRenderItems(searchString: string): Array<RenderItem> {
    const n: number = searchString.length;
    let baselineShift: string;

    const idx: number = searchString.search( TextItem.SUB_SUPER );
    if (idx >= 0) {
      const subIdx = searchString.search(TextItem.SUB_RE);
      if (subIdx === idx) {
        baselineShift = 'sub';
      } else {
        baselineShift = 'super';
      }
    }

    if (idx >= 0) {
      const endI: number = searchString.search( /}/);

      // Create 2 RenderItems for tspan
      const textItem = new RenderItem(`t-${this.incX}-${this.id}`, 'svg', 'text');
      textItem.addAttr('x', this.x + this.incX);
      textItem.addAttr('y', this.y);
      textItem.addAttr('text-anchor', this.textAnchor);
      textItem.addAttr('font-size', TextItem.FONT_SIZE);
      textItem.setText( searchString.substring(0, idx) );

      const spanItem = new RenderItem(`d-${this.incX}-${this.id}`, `svg text#t-${this.incX}-${this.id}`, 'tspan');
      spanItem.addAttr('baseline-shift', baselineShift);
      spanItem.addAttr('font-size', TextItem.SUBSCRIPT_SIZE);
      spanItem.setText( this.cleanString( searchString.substring(idx, endI + 1) ) );

      // TODO: Update spacing numbers -- this seems to overshoot a bit (??)
      this.incX += TextItem.GRID_META_COORD_WIDTH * idx;
      if (endI + 1 < n) {
        return _.concat([textItem, spanItem],
          this.getSubRenderItems(searchString.substring(endI + 1))
        );
      } else {
        return [textItem, spanItem];
      }
    } else {
      const textItem = new RenderItem(this.id, 'svg', 'text');
      textItem.addAttr('x', this.x + this.incX);
      textItem.addAttr('y', this.y);
      textItem.addAttr('text-anchor', this.textAnchor);
      // textItem.addAttr('font-size', TextItem.FONT_SIZE);
      textItem.setText( searchString );
      return [textItem];
    }
  }

  getRenderItems(): Array<RenderItem> {
    this.incX = 0;
    return this.getSubRenderItems( this.textContent );
  }

  // getRenderItem(): RenderItem {
  //   // TODO: if this.textContent has 1 or more sub/super scripts, this will need to be more complicated
  //   //  --> With multiple render items appended to each other
  //   const textItem = new RenderItem(this.id, 'svg', 'text');
  //   textItem.addAttr('x', this.x);
  //   textItem.addAttr('y', this.y);
  //   textItem.addAttr('text-anchor', this.textAnchor);
  //   textItem.setText( this.textContent );
  //   // Split string based on _{*} or ^{*} then create a separate text item up until }
  //
  //   return textItem;
  // }
}
