import { RenderItem } from './RenderItem';

import * as d3 from 'd3';

import { isNullOrUndefined } from 'util';
import { Deferred } from 'ts-deferred';


export class Frame {
  private static DURATION = 1000;
  private static DELAY = 1000;

  public id: number;

  // Any new SVG or DOM objects to be rendered in this frame using d3 are stored here
  private renderItems: Array<RenderItem> = [];

  // Every modification to existing SVG/DOM objects will be stored here
  // idAccessor should be a fully qualified path to an element
  private renderDeltas: { [idAccessor: string]: RenderItem; } = { };

  private removeDeltas: Array<RenderItem> = [];

  private nextFrame: Frame;

  private renderPromises: Array<Promise<Boolean>> = [];
  private renderDeferreds: Array<Deferred<Boolean>> = [];

  private deferred: Deferred<Boolean>;

  constructor(renderItems?: Array<RenderItem>) {
    if (!isNullOrUndefined(renderItems)) {
      this.renderItems = renderItems;
    }
  }

  setId(id: number) {
    this.id = id;
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
    // Define d3 transitions for all deltas defined in this Frame, and register their completion in a promise
    if ( !isNullOrUndefined(this.renderDeltas) ) {

      for (const idAccessor in this.renderDeltas) {
        if (this.renderDeltas.hasOwnProperty(idAccessor)) {

          const selection = d3.select(idAccessor)
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

          if (!isNullOrUndefined(this.renderDeltas[idAccessor].textAttr)) {
            selection.text(this.renderDeltas[idAccessor].textAttr);
          }

          // ********* Attach a promise resolution to the end of each transition event *********
          const deferred = new Deferred<Boolean>();
          this.renderDeferreds.push(deferred);

          selection.on('end', function () {
            deferred.resolve(true);
          }.bind(this));

          this.renderPromises.push(
            deferred.promise
          );

        }
      }
    }

    // After all previous transition 'end' events have been fired, draw/transition the next frame
    if (!isNullOrUndefined(this.nextFrame)) {
      Promise.all(this.renderPromises).then(() => {

        this.executeNext();

      }).catch( (error) => {
        console.log(error);
      });
    }

  } // End transition()

  executeNext(): void {
    // Remove old elements
    this.nextFrame.pruneItems();

    // Render new svg/html elements:
    // N.B:  if render is delayed, transition should be too, in order to avoid a race condition
    //       (transition on item not yet rendered attempts to get scheduled)
    this.nextFrame.render();

    // Begin the transition of already rendered elements
    this.nextFrame.transition();
  }
}
