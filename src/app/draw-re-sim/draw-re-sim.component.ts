import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

import { TextItem } from '../../common-drawing/TextItem';
import { TextNode } from '../../common-drawing/TextNode';
import { Node } from '../../common-drawing/Node';

import { Frame } from '../../common-simulation/Frame';
import { RenderItem } from '../../common-simulation/RenderItem';

import { GridMeta } from '../../common-drawing/GridMeta';
import { BarBox } from '../../common-drawing/BarBox';


import { Edge, ArrowType, ArcType } from '../../common-drawing/Edge';
import {GridPoint} from '../../common-drawing/GridPoint';


@Component({
  selector: 'app-draw-re-sim',
  templateUrl: './draw-re-sim.component.html',
  styleUrls: ['./draw-re-sim.component.css']
})
export class DrawReSimComponent implements OnInit {
  private static XORIG = -350;
  private static YORIG = -250;

  private gridMeta: GridMeta;

  // Space between each node drawn on grid in both horizontal (GC) and vertical (GR) dimensions
  private GC: number; // GW = Grid Column
  private GR: number; // GR = Grid Row

  svg: any; // SVG Grid to render objects onto

  frames: Array<Frame>;

  frame0Data = {};

  constructor() {
    // Single box to fit uppercase font-size = 10
    this.gridMeta = {
      X_ORIGIN: DrawReSimComponent.XORIG,
      Y_ORIGIN: DrawReSimComponent.YORIG,
      COORDINATE_WIDTH: 22,
      COORDINATE_HEIGHT: 22
    };

    // Arbitrary sizing for our pre-ordained purposes
    this.GC = 3 * this.gridMeta.COORDINATE_WIDTH;
    this.GR = 8 * this.gridMeta.COORDINATE_HEIGHT;
  }

  createFrame0(): Frame {
    const testFrame = new Frame();

    const textNodeOne: TextNode = new TextNode(
      this.gridMeta, 'n-0',
      this.gridMeta.COORDINATE_WIDTH * 2,
      this.gridMeta.COORDINATE_HEIGHT * 4,
      'blue', 'User'
    );
    const textNodeTwo: TextNode = new TextNode(
      this.gridMeta, 'n-1',
      this.gridMeta.COORDINATE_WIDTH * 8,
      this.gridMeta.COORDINATE_HEIGHT * 4,
      'blue', 'UserProfile'
    );
    const textNodeThree: TextNode = new TextNode(
      this.gridMeta, 'n-2',
      this.gridMeta.COORDINATE_WIDTH * 8,
      this.gridMeta.COORDINATE_HEIGHT * 12,
      'blue', 'Firm'
    );
    const textNodeFour: TextNode = new TextNode(
      this.gridMeta, 'n-3',
      this.gridMeta.COORDINATE_WIDTH * 22,
      this.gridMeta.COORDINATE_HEIGHT * 4,
      'blue', '-Tag-'
    );

    this.frame0Data['textNodeOne'] = textNodeOne;
    this.frame0Data['textNodeTwo'] = textNodeTwo;
    this.frame0Data['textNodeThree'] = textNodeThree;
    this.frame0Data['textNodeFour'] = textNodeFour;

    const items = textNodeOne.getRenderItems();
    for (let i = 0; i < items.length; i++) {
      testFrame.addItem(items[i]);
    }

    const itemsTwo = textNodeTwo.getRenderItems();
    for (let i = 0; i < itemsTwo.length; i++) {
      testFrame.addItem(itemsTwo[i]);
    }

    const itemsThree = textNodeThree.getRenderItems();
    for (let i = 0; i < itemsThree.length; i++) {
      testFrame.addItem(itemsThree[i]);
    }

    const itemsFour = textNodeFour.getRenderItems();
    for (let i = 0; i < itemsFour.length; i++) {
      testFrame.addItem(itemsFour[i]);
    }

    const nodeOne = textNodeOne.getNode();
    nodeOne.x = nodeOne.x - this.gridMeta.X_ORIGIN;
    nodeOne.y = nodeOne.y - this.gridMeta.Y_ORIGIN;

    const nodeTwo = textNodeTwo.getNode();
    nodeTwo.x = nodeTwo.x - this.gridMeta.X_ORIGIN;
    nodeTwo.y = nodeTwo.y - this.gridMeta.Y_ORIGIN;

    const nodeThree = textNodeThree.getNode();
    nodeThree.x = nodeThree.x - this.gridMeta.X_ORIGIN;
    nodeThree.y = nodeThree.y - this.gridMeta.Y_ORIGIN;

    const nodeFour = textNodeFour.getNode();
    nodeFour.x = nodeFour.x - this.gridMeta.X_ORIGIN;
    nodeFour.y = nodeFour.y - this.gridMeta.Y_ORIGIN;

    this.frame0Data['nodeOne'] = nodeOne;
    this.frame0Data['nodeTwo'] = nodeTwo;
    this.frame0Data['nodeThree'] = nodeThree;
    this.frame0Data['nodeFour'] = nodeFour;

    const barBoxOne: BarBox = new BarBox(this.gridMeta, 'green', nodeOne);
    barBoxOne.addRow(
      'id', '...'
    );
    const barBoxTwo: BarBox = new BarBox(this.gridMeta, 'green', nodeTwo);
    barBoxTwo.addRow(
      'id', '...'
    );
    barBoxTwo.addRow(
      'fk', '...'
    );
    barBoxTwo.addRow(
      'fk', '...'
    );

    const barBoxThree: BarBox = new BarBox(this.gridMeta, 'green', nodeThree);
    barBoxThree.addRow(
      'id', '...'
    );

    const barBoxFour: BarBox = new BarBox(this.gridMeta, 'green', nodeFour);
    barBoxFour.addRow(
      'fk', '...'
    );

    this.frame0Data['barBoxOne'] = barBoxOne;
    this.frame0Data['barBoxTwo'] = barBoxTwo;
    this.frame0Data['barBoxThree'] = barBoxThree;
    this.frame0Data['barBoxFour'] = barBoxFour;

    const itemsFive: Array<RenderItem> = barBoxOne.getRenderItems();
    for (let i = 0; i < itemsFive.length; i++) {
      testFrame.addItem(itemsFive[i]);
    }

    const itemsSix: Array<RenderItem> = barBoxTwo.getRenderItems();
    for (let i = 0; i < itemsSix.length; i++) {
      testFrame.addItem(itemsSix[i]);
    }

    const items0: Array<RenderItem> = barBoxThree.getRenderItems();
    for (let i = 0; i < items0.length; i++) {
      testFrame.addItem(items0[i]);
    }

    const items1: Array<RenderItem> = barBoxFour.getRenderItems();
    for (let i = 0; i < items1.length; i++) {
      testFrame.addItem(items1[i]);
    }

    /********************** Edges **********************/
    /** e-0 ********************************************/
    const edge: Edge = new Edge(
      'e-0', this.gridMeta, nodeTwo, nodeOne, ArcType.LINE_STRAIGHT, ArrowType.EAST
    );
    const source: GridPoint = {x: null, y: null};
    const target: GridPoint = {x: null, y: null};
    source.x = barBoxTwo.getRowX(ArrowType.EAST) - this.gridMeta.X_ORIGIN;
    source.y = barBoxTwo.getRowY(1) - this.gridMeta.Y_ORIGIN;

    target.x = barBoxOne.getRowX(ArrowType.WEST); // - this.gridMeta.X_ORIGIN;
    target.y = barBoxOne.getRowY(0); // - this.gridMeta.Y_ORIGIN;

    edge.setManualTargets(
      source, target
    );
    const items2 = edge.getRenderItems();
    for (let i = 0; i < items2.length; i++) {
      testFrame.addItem(items2[i]);
    }

    /** e-1 ********************************************/
    const edge0: Edge = new Edge(
      'e-1', this.gridMeta, nodeTwo, nodeThree, ArcType.LINE_KINKED, ArrowType.WEST
    );
    const source0: GridPoint = {x: null, y: null};
    const target0: GridPoint = {x: null, y: null};
    source0.x = barBoxTwo.getRowX(ArrowType.EAST) - this.gridMeta.X_ORIGIN;
    source0.y = barBoxTwo.getRowY(2) - this.gridMeta.Y_ORIGIN;

    target0.x = barBoxThree.getRowX(ArrowType.EAST); // - this.gridMeta.X_ORIGIN;
    target0.y = barBoxThree.getRowY(0); // - this.gridMeta.Y_ORIGIN;

    edge0.setManualTargets(
      source0, target0
    );
    const items3 = edge0.getRenderItems();
    for (let i = 0; i < items3.length; i++) {
      testFrame.addItem(items3[i]);
    }

    /** e-2 ********************************************/
    const edge1: Edge = new Edge(
      'e-2', this.gridMeta, nodeFour, nodeTwo, ArcType.LINE_STRAIGHT, ArrowType.EAST
    );
    const source1: GridPoint = {x: null, y: null};
    const target1: GridPoint = {x: null, y: null};
    source1.x = barBoxFour.getRowX(ArrowType.EAST) - this.gridMeta.X_ORIGIN;
    source1.y = barBoxFour.getRowY(0) - this.gridMeta.Y_ORIGIN;

    target1.x = barBoxTwo.getRowX(ArrowType.WEST); // - this.gridMeta.X_ORIGIN;
    target1.y = barBoxTwo.getRowY(0); // - this.gridMeta.Y_ORIGIN;

    edge1.setManualTargets(
      source1, target1
    );
    const items4 = edge1.getRenderItems();
    for (let i = 0; i < items4.length; i++) {
      testFrame.addItem(items4[i]);
    }

    this.frame0Data['edge'] = edge;
    this.frame0Data['edge0'] = edge0;
    this.frame0Data['edge1'] = edge1;

    return testFrame;
  }

  createFrame1(): Frame {
    const frame: Frame = new Frame();

    /********************** Edges **********************/
    /** e-0 ********************************************/
    const edge: Edge = new Edge(
      'e-0', this.gridMeta, this.frame0Data['nodeTwo'], this.frame0Data['nodeOne'], ArcType.LINE_STRAIGHT, ArrowType.EAST
    );

    const items2 = edge.getRenderItems();
    for (let i = 0; i < items2.length; i++) {
      frame.addDelta(items2[i]);
    }

    /** e-1 ********************************************/
    const edge0: Edge = new Edge(
      'e-1', this.gridMeta, this.frame0Data['nodeTwo'], this.frame0Data['nodeThree'], ArcType.LINE_KINKED, ArrowType.WEST
    );

    const items3 = edge0.getRenderItems();
    for (let i = 0; i < items3.length; i++) {
      frame.addDelta(items3[i]);
    }

    /** e-2 ********************************************/
    const edge1: Edge = new Edge(
      'e-2', this.gridMeta, this.frame0Data['nodeFour'], this.frame0Data['nodeTwo'], ArcType.LINE_STRAIGHT, ArrowType.EAST
    );

    const items4 = edge1.getRenderItems();
    for (let i = 0; i < items4.length; i++) {
      frame.addDelta(items4[i]);
    }

    return frame;
  }

  ngOnInit() {
    this.svg = d3.select('div#re-sim')
      .append('svg')
      .attr('viewBox', '-350 -250 700 500')
      .classed('svg-content', true);

    this.frames = [];

    this.frames.push(
      this.createFrame0()
    );
    this.frames.push(
      this.createFrame1()
    );

    this.frames[0].setNext(this.frames[1]);

    this.frames[0].render();
    this.frames[0].transition();
  }
}
