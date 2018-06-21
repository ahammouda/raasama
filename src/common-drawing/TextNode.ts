import { Node } from './Node';
import { TextItem } from './TextItem';

export class TextNode {
  TN_H: number; // Text-Node height
  textItem: TextItem;
  node: Node;

  constructor(gridElemHeight: number, textItem: TextItem, node: Node) {
    this.TN_H = 2 * gridElemHeight; // text-box height
  }

}
