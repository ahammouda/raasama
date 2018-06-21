import { Component, OnInit } from '@angular/core';

import { TextItem } from '../../common-drawing/TextItem';
import { TextNode } from '../../common-drawing/TextNode';
import { Node } from '../../common-drawing/Node';

import { Frame } from '../../common-simulation/Frame';
import { RenderItem } from '../../common-simulation/RenderItem';

import * as d3 from 'd3';

@Component({
  selector: 'app-drawing-examples',
  templateUrl: './drawing-examples.component.html',
  styleUrls: ['./drawing-examples.component.css']
})
export class DrawingExamplesComponent implements OnInit {
  private static XORIG = -350;
  private static YORIG = -250;

  // Dimensions of a single coordinate point of the cartesian grid represented by the svg viewport
  private CH: number; // CH = Coodinate Height
  private CW: number; // CW = Coordinate Width

  // Space between each node drawn on grid in both horizontal (GC) and vertical (GR) dimensions
  private GC: number; // GW = Grid Column
  private GR: number; // GR = Grid Row

  svg: any; // SVG Grid to render objects onto

  constructor() {
    // Single box to fit uppercase font-size = 10
    this.CH = 22;
    this.CW = 22;

    // Arbitrary sizing for our pre-ordained purposes
    this.GC = 3 * this.CW;
    this.GR = 8 * this.CH;
  }

  ngOnInit() {
    this.svg = d3.select('div#d3-draw-egs')
      .append('svg')
      .attr('viewBox', '-350 -250 700 500')
      .classed('svg-content', true);

    // Render a single text box
    // 1. Construct TextNode
    //    --> Constructs node (using legacy rectangle inputs)
    //    --> Constructs textItem using refined legacy process

    // Create renderItems from objects (potentially building their own toRenderItem methods)
  }
}
