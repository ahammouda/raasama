import { RenderItem } from './RenderItem';

import * as d3 from 'd3';

import { isNullOrUndefined } from 'util';


export class Frame {
  private static DURATION = 1000;
  private static DELAY = 1000;
  // Any new SVG or DOM objects to be rendered in this frame using d3 are stored here
  private renderItems: Array<RenderItem> = [];

  // Every modification to existing SVG/DOM objects will be stored here
  // idAccessor should be a fully qualified path to an element
  private renderDeltas: { [idAccessor: string]: RenderItem; } = { };

  private removeDeltas: Array<RenderItem> = [];

  private nextFrame: Frame;
  private lastFrame: Frame;

  constructor(renderItems?: Array<RenderItem>) {
    if (!isNullOrUndefined(renderItems)) {
      this.renderItems = renderItems;
    }
  }

  addItem(item: RenderItem) {
    this.renderItems.push(item);
  }

  addDelta(item: RenderItem) {
    this.renderDeltas[item.getIdAccessor()] = item;
  }

  addRemoveElement(item: RenderItem) {
    this.removeDeltas.push( item );
  }

  setNext(frame: Frame) {
    this.nextFrame = frame;
  }

  render() {
    // Renders d3 attributes -- probably the only time this should be called only on the initial frame
    // everything else after that should be
    for (const renderItem of this.renderItems) {
      renderItem.render();
    }
  }

  pruneItems() {
    if ( !isNullOrUndefined(this.removeDeltas) ) {
      for (let i = 0; i < this.removeDeltas.length; i++) {
        this.removeDeltas[i].remove();
      }
    }
  }

  transition() {
    // TODO: Need an additional loop to transition any remove items separately -- will be same as the below, only
    // TODO) inner .attr('','') will be replaced with remove()
    let selection;
    if ( !isNullOrUndefined(this.renderDeltas) ) {

      for (const idAccessor in this.renderDeltas) {
        if (this.renderDeltas.hasOwnProperty(idAccessor)) {

          selection = d3.select(idAccessor)
            .transition()
            .duration(Frame.DURATION)
            .delay(Frame.DELAY);

          for (const key in this.renderDeltas[idAccessor].attributes) {
            if (this.renderDeltas[idAccessor].attributes.hasOwnProperty(key)) {

              selection.attr(
                key, this.renderDeltas[idAccessor].attributes[key]
              );

            }
          }

          if (! isNullOrUndefined(this.renderDeltas[idAccessor].textAttr) ) {
            selection.text( this.renderDeltas[idAccessor].textAttr );
          }

        }
      }
      if ( !isNullOrUndefined(this.nextFrame) && !isNullOrUndefined(selection) ) {
        // THERE ARE not renderDeltas here, but there are pruneDeltas
        // TODO: Control this externally either by passing in the callback or some other mechanism
        selection.on(
          'end', function () {
            // TODO: Right now you're only triggering this for the very last selection that gets instantiated in this loop
            // TODO) you should call a .on( function for each selection, which increments a counter;
            // TODO) when this counter === nDeltas ( or nDeltas - 1), THEN trigger this.nextFrame.render();
            //        <-- You'll need to figure out what the javascript equivalent for making the variable atomic is
            // See: https://stackoverflow.com/questions/41734921/rxjs-wait-for-all-observables-in-an-array-to-complete-or-error/41735096
            // AND: https://stackoverflow.com/questions/44004144/how-to-wait-for-two-observables-in-rxjs
            this.nextFrame.pruneItems();

            // This is starting to feel a bit fraught
            setTimeout(function() {
              this.nextFrame.render();
            }.bind(this), Frame.DELAY );

            this.nextFrame.transition();
          }.bind(this));
      } else if ( !isNullOrUndefined(this.nextFrame) && isNullOrUndefined(selection) ) {
        setTimeout(function() {
          this.nextFrame.pruneItems();

          // This is starting to feel a bit fraught
          setTimeout(function() {
            this.nextFrame.render();
          }.bind(this), 1 );

          this.nextFrame.transition();
        }.bind(this), Frame.DELAY );
      }
    } else {
      if (!isNullOrUndefined(this.nextFrame)) {
        setTimeout(function() {
          this.nextFrame.pruneItems();

          // This is starting to feel a bit fraught
          setTimeout(function() {
            this.nextFrame.render();
          }.bind(this), 1 );

          this.nextFrame.transition();
        }.bind(this), Frame.DELAY );
      }
    }
  } // End transition()
}
