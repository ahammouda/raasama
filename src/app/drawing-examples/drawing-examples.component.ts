import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

import { TextItem } from '../../common-drawing/TextItem';
import { TextNode } from '../../common-drawing/TextNode';
import { Node } from '../../common-drawing/Node';

import { Frame } from '../../common-simulation/Frame';
import { RenderItem } from '../../common-simulation/RenderItem';

import { GridMeta } from '../../common-drawing/GridMeta';


import { Edge, ArrowType, ArcType } from '../../common-drawing/Edge';

@Component({
  selector: 'app-drawing-examples',
  templateUrl: './drawing-examples.component.html',
  styleUrls: ['./drawing-examples.component.css']
})
export class DrawingExamplesComponent implements OnInit {
  private static XORIG = -350;
  private static YORIG = -250;

  private gridMeta: GridMeta;

  // Space between each node drawn on grid in both horizontal (GC) and vertical (GR) dimensions
  private GC: number; // GW = Grid Column
  private GR: number; // GR = Grid Row

  svg: any; // SVG Grid to render objects onto

  constructor() {
    // Single box to fit uppercase font-size = 10
    this.gridMeta = {
      X_ORIGIN: DrawingExamplesComponent.XORIG,
      Y_ORIGIN: DrawingExamplesComponent.YORIG,
      COORDINATE_WIDTH: 22,
      COORDINATE_HEIGHT: 22
    };

    // Arbitrary sizing for our pre-ordained purposes
    this.GC = 3 * this.gridMeta.COORDINATE_WIDTH;
    this.GR = 8 * this.gridMeta.COORDINATE_HEIGHT;
  }

  createTestFrame(): Frame {
    const testFrame = new Frame();

    const textNodeOne: TextNode = new TextNode(this.gridMeta, 'n-0',
      this.gridMeta.COORDINATE_WIDTH * 2,
      0,
      'blue', 'Firm'
    );
    const textNodeTwo: TextNode = new TextNode(this.gridMeta, 'n-1',
      this.gridMeta.COORDINATE_WIDTH * 2,
      this.gridMeta.COORDINATE_HEIGHT * 8,
      'blue', 'Image'
    );

    const items = textNodeOne.getRenderItems();
    for (let i = 0; i < items.length; i++) {
      testFrame.addItem(items[i]);
    }

    const itemsTwo = textNodeTwo.getRenderItems();
    for (let i = 0; i < itemsTwo.length; i++) {
      testFrame.addItem(itemsTwo[i]);
    }

    const nodeOne = textNodeOne.getNode();
    nodeOne.x = nodeOne.x - this.gridMeta.X_ORIGIN;
    nodeOne.y = nodeOne.y - this.gridMeta.Y_ORIGIN;

    const nodeTwo = textNodeTwo.getNode();
    nodeTwo.x = nodeTwo.x - this.gridMeta.X_ORIGIN;
    nodeTwo.y = nodeTwo.y - this.gridMeta.Y_ORIGIN;

    const edge: Edge = new Edge(
      'e-0', this.gridMeta, nodeOne, nodeTwo, ArcType.CURVE, ArrowType.EAST
    );

    const itemsThree = edge.getRenderItems();
    for (let i = 0; i < itemsThree.length; i++) {
      testFrame.addItem(itemsThree[i]);
    }

    return testFrame;
  }

  ngOnInit() {
    this.svg = d3.select('div#d3-draw-egs')
      .append('svg')
      .attr('viewBox', '-350 -250 700 500')
      .classed('svg-content', true);

    const frame: Frame = this.createTestFrame();
    frame.render();
  }
}
