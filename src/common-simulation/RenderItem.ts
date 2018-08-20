import * as d3 from 'd3';
import {isNullOrUndefined} from 'util';

export class RenderItem {
  private static DELAY = 0; // TODO: Fix this leaky abstraction
  /* Essentially a representation of the things needed to render d3 to the DOM */
  public id: string;

  public svgPath: string; // Most often, this will just be 'svg', but sometimes maybe 'svg rect#elem-id' for nested items

  public svgType: string; // i.e. path, circle, div, etc

  public attributes: { [attr: string]: string; } = { };

  public textAttr: string;

  constructor(id: string, svgPath: string, svgType: string) {
    this.id = id;
    this.svgPath = svgPath;
    this.svgType = svgType;
  }

  addAttr(name: string, value: any) {
    this.attributes[name] = value;
  }

  setText(text: string) {
    this.textAttr = text;
  }

  getIdAccessor() {
    return `${this.svgPath} ${this.svgType}#${this.id}`;
  }

  render() {
    /* This should only be called once for a given instantiation */
    const selection = d3.select( this.svgPath ).append( this.svgType ).attr('id', this.id);

    for (const attr in this.attributes) {
      if (this.attributes.hasOwnProperty(attr)) {

        selection.attr(
          attr, this.attributes[attr]
        );

      }
    }

    if (! isNullOrUndefined(this.textAttr) ) {
      selection.text( this.textAttr );
    }
  }

  remove() {
    d3.select( this.getIdAccessor() )
      .transition()
      .delay(RenderItem.DELAY)
      .remove();
  }
}
