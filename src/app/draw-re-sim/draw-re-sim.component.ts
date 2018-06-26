import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

import { TextItem } from '../../common-drawing/TextItem';
import { TextNode } from '../../common-drawing/TextNode';
import { Node } from '../../common-drawing/Node';

import { Frame } from '../../common-simulation/Frame';
import { RenderItem } from '../../common-simulation/RenderItem';

import { GridMeta } from '../../common-drawing/GridMeta';
import { BarBox } from '../../common-drawing/BarBox';
import {GridTable} from '../../common-drawing/GridTable';

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

  /**
   *  Initial rendering of elements */
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

  /**
   *  Moves arrows away from bbox to textbox */
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

  /**
   *  Remove all bbox items */
  createFrame2(): Frame {
    const frame: Frame = new Frame();

    const items0 = this.frame0Data['barBoxOne'].getRenderItems();
    for (let i = 0; i < items0.length; i++) {
      frame.addRemoveElement(items0[i]);
    }
    const items1 = this.frame0Data['barBoxTwo'].getRenderItems();
    for (let i = 0; i < items1.length; i++) {
      frame.addRemoveElement(items1[i]);
    }
    const items2 = this.frame0Data['barBoxThree'].getRenderItems();
    for (let i = 0; i < items2.length; i++) {
      frame.addRemoveElement(items2[i]);
    }
    const items3 = this.frame0Data['barBoxFour'].getRenderItems();
    for (let i = 0; i < items3.length; i++) {
      frame.addRemoveElement(items3[i]);
    }
    return frame;
  }

  /**
   *  Changes label, and adjusts rectangle size, and moves arrow along with it */
  createFrame3(): Frame {
    const frame = new Frame();
    // Just reinitialize the textNode with a different label
    const textNodeOne: TextNode = new TextNode(
      this.gridMeta, 'n-0',
      this.gridMeta.COORDINATE_WIDTH * 2,
      this.gridMeta.COORDINATE_HEIGHT * 4,
      'blue', 'U'
    );
    const textNodeTwo: TextNode = new TextNode(
      this.gridMeta, 'n-1',
      this.gridMeta.COORDINATE_WIDTH * 8,
      this.gridMeta.COORDINATE_HEIGHT * 4,
      'blue', 'P'
    );
    const textNodeThree: TextNode = new TextNode(
      this.gridMeta, 'n-2',
      this.gridMeta.COORDINATE_WIDTH * 8,
      this.gridMeta.COORDINATE_HEIGHT * 12,
      'blue', 'F'
    );
    const textNodeFour: TextNode = new TextNode(
      this.gridMeta, 'n-3',
      this.gridMeta.COORDINATE_WIDTH * 22,
      this.gridMeta.COORDINATE_HEIGHT * 4,
      'blue', 'T'
    );

    const items = textNodeOne.getRenderItems();
    for (let i = 0; i < items.length; i++) {
      frame.addDelta(items[i]);
    }

    const itemsTwo = textNodeTwo.getRenderItems();
    for (let i = 0; i < itemsTwo.length; i++) {
      frame.addDelta(itemsTwo[i]);
    }

    const itemsThree = textNodeThree.getRenderItems();
    for (let i = 0; i < itemsThree.length; i++) {
      frame.addDelta(itemsThree[i]);
    }

    const itemsFour = textNodeFour.getRenderItems();
    for (let i = 0; i < itemsFour.length; i++) {
      frame.addDelta(itemsFour[i]);
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

    // Adjust edges
    /********************** Edges **********************/
    /** e-0 ********************************************/
    const edge: Edge = new Edge(
      'e-0', this.gridMeta, nodeTwo, nodeOne, ArcType.LINE_STRAIGHT, ArrowType.EAST
    );

    const items2 = edge.getRenderItems();
    for (let i = 0; i < items2.length; i++) {
      frame.addDelta(items2[i]);
    }

    /** e-1 ********************************************/
    const edge0: Edge = new Edge(
      'e-1', this.gridMeta, nodeTwo, nodeThree, ArcType.LINE_KINKED, ArrowType.WEST
    );

    const items3 = edge0.getRenderItems();
    for (let i = 0; i < items3.length; i++) {
      frame.addDelta(items3[i]);
    }

    /** e-2 ********************************************/
    const edge1: Edge = new Edge(
      'e-2', this.gridMeta, nodeFour, nodeTwo, ArcType.LINE_STRAIGHT, ArrowType.EAST
    );

    const items4 = edge1.getRenderItems();
    for (let i = 0; i < items4.length; i++) {
      frame.addDelta(items4[i]);
    }

    return frame;
  }

  /**
   * Rearrange nodes along verticle line to perform sorting */
  createFrame4(): Frame {
    const frame: Frame = new Frame();
    // Just reinitialize the textNode with a different label
    const textNodeOne: TextNode = new TextNode(
      this.gridMeta, 'n-0',
      this.gridMeta.COORDINATE_WIDTH * 2,
      this.gridMeta.COORDINATE_HEIGHT * 4,
      'blue', 'U'
    );
    const textNodeTwo: TextNode = new TextNode(
      this.gridMeta, 'n-1',
      this.gridMeta.COORDINATE_WIDTH * 2,
      this.gridMeta.COORDINATE_HEIGHT * 7,
      'blue', 'P'
    );
    const textNodeThree: TextNode = new TextNode(
      this.gridMeta, 'n-2',
      this.gridMeta.COORDINATE_WIDTH * 2,
      this.gridMeta.COORDINATE_HEIGHT * 10,
      'blue', 'F'
    );
    const textNodeFour: TextNode = new TextNode(
      this.gridMeta, 'n-3',
      this.gridMeta.COORDINATE_WIDTH * 2,
      this.gridMeta.COORDINATE_HEIGHT * 13,
      'blue', 'T'
    );

    const items = textNodeOne.getRenderItems();
    for (let i = 0; i < items.length; i++) {
      frame.addDelta(items[i]);
    }

    const itemsTwo = textNodeTwo.getRenderItems();
    for (let i = 0; i < itemsTwo.length; i++) {
      frame.addDelta(itemsTwo[i]);
    }

    const itemsThree = textNodeThree.getRenderItems();
    for (let i = 0; i < itemsThree.length; i++) {
      frame.addDelta(itemsThree[i]);
    }

    const itemsFour = textNodeFour.getRenderItems();
    for (let i = 0; i < itemsFour.length; i++) {
      frame.addDelta(itemsFour[i]);
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

    // Adjust edges
    /********************** Edges **********************/
    /** e-0 ********************************************/
    const edge: Edge = new Edge(
      'e-0', this.gridMeta, nodeTwo, nodeOne, ArcType.LINE_KINKED, ArrowType.EAST
    );

    const items2 = edge.getRenderItems();
    for (let i = 0; i < items2.length; i++) {
      frame.addDelta(items2[i]);
    }

    /** e-1 ********************************************/
    const edge0: Edge = new Edge(
      'e-1', this.gridMeta, nodeTwo, nodeThree, ArcType.LINE_KINKED, ArrowType.EAST
    );

    const items3 = edge0.getRenderItems();
    for (let i = 0; i < items3.length; i++) {
      frame.addDelta(items3[i]);
    }

    /** e-2 ********************************************/
    const edge1: Edge = new Edge(
      'e-2', this.gridMeta, nodeFour, nodeTwo, ArcType.LINE_KINKED, ArrowType.EAST
    );

    const items4 = edge1.getRenderItems();
    for (let i = 0; i < items4.length; i++) {
      frame.addDelta(items4[i]);
    }

    return frame;
  }

  /**
   * Rectangles to circular form
  */
  createFrame5(): Frame {
    const frame: Frame = new Frame();
    const textNodeOne: TextNode = new TextNode(
      this.gridMeta, 'n-0',
      this.gridMeta.COORDINATE_WIDTH * 2,
      this.gridMeta.COORDINATE_HEIGHT * 4,
      'blue', 'U', null, true
    );
    const textNodeTwo: TextNode = new TextNode(
      this.gridMeta, 'n-1',
      this.gridMeta.COORDINATE_WIDTH * 2,
      this.gridMeta.COORDINATE_HEIGHT * 7,
      'blue', 'P', null, true
    );
    const textNodeThree: TextNode = new TextNode(
      this.gridMeta, 'n-2',
      this.gridMeta.COORDINATE_WIDTH * 2,
      this.gridMeta.COORDINATE_HEIGHT * 10,
      'blue', 'F', null, true
    );
    const textNodeFour: TextNode = new TextNode(
      this.gridMeta, 'n-3',
      this.gridMeta.COORDINATE_WIDTH * 2,
      this.gridMeta.COORDINATE_HEIGHT * 13,
      'blue', 'T', null, true
    );

    const items = textNodeOne.getRenderItems();
    for (let i = 0; i < items.length; i++) {
      frame.addDelta(items[i]);
    }

    const itemsTwo = textNodeTwo.getRenderItems();
    for (let i = 0; i < itemsTwo.length; i++) {
      frame.addDelta(itemsTwo[i]);
    }

    const itemsThree = textNodeThree.getRenderItems();
    for (let i = 0; i < itemsThree.length; i++) {
      frame.addDelta(itemsThree[i]);
    }

    const itemsFour = textNodeFour.getRenderItems();
    for (let i = 0; i < itemsFour.length; i++) {
      frame.addDelta(itemsFour[i]);
    }

    return frame;
  }

  /**
   * Turn edges into arcs
   * @returns {Frame}
   */
  createFrame5a(): Frame {
    const frame: Frame = new Frame();

    // Recreate nodes without drawing, and make curve between nodes
    const textNodeOne: TextNode = new TextNode(
      this.gridMeta, 'n-0',
      this.gridMeta.COORDINATE_WIDTH * 2,
      this.gridMeta.COORDINATE_HEIGHT * 4,
      'blue', 'U', null, true
    );
    const textNodeTwo: TextNode = new TextNode(
      this.gridMeta, 'n-1',
      this.gridMeta.COORDINATE_WIDTH * 2,
      this.gridMeta.COORDINATE_HEIGHT * 7,
      'blue', 'P', null, true
    );
    const textNodeThree: TextNode = new TextNode(
      this.gridMeta, 'n-2',
      this.gridMeta.COORDINATE_WIDTH * 2,
      this.gridMeta.COORDINATE_HEIGHT * 10,
      'blue', 'F', null, true
    );
    const textNodeFour: TextNode = new TextNode(
      this.gridMeta, 'n-3',
      this.gridMeta.COORDINATE_WIDTH * 2,
      this.gridMeta.COORDINATE_HEIGHT * 13,
      'blue', 'T', null, true
    );

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

    /********************** Edges **********************/
    /** e-0 ********************************************/
    const edge: Edge = new Edge(
      'e-0', this.gridMeta, nodeTwo, nodeOne, ArcType.CURVE, ArrowType.EAST
    );

    const items2 = edge.getRenderItems();
    for (let i = 0; i < items2.length; i++) {
      frame.addDelta(items2[i]);
    }

    /** e-1 ********************************************/
    const edge0: Edge = new Edge(
      'e-1', this.gridMeta, nodeTwo, nodeThree, ArcType.CURVE, ArrowType.EAST
    );

    const items3 = edge0.getRenderItems();
    for (let i = 0; i < items3.length; i++) {
      frame.addDelta(items3[i]);
    }

    /** e-2 ********************************************/
    const edge1: Edge = new Edge(
      'e-2', this.gridMeta, nodeFour, nodeTwo, ArcType.CURVE, ArrowType.EAST
    );

    const items4 = edge1.getRenderItems();
    for (let i = 0; i < items4.length; i++) {
      frame.addDelta(items4[i]);
    }

    return frame;
  }

  /**
   * Draw items in topologically sorted order
   * @returns {Frame}
   */
  createFrame6() {
    const frame: Frame = new Frame();
    const textNodeOne: TextNode = new TextNode(
      this.gridMeta, 'n-0',
      this.gridMeta.COORDINATE_WIDTH * 2,
      this.gridMeta.COORDINATE_HEIGHT * 13,
      'blue', 'U', null, true
    );
    const textNodeTwo: TextNode = new TextNode(
      this.gridMeta, 'n-1',
      this.gridMeta.COORDINATE_WIDTH * 2,
      this.gridMeta.COORDINATE_HEIGHT * 7,
      'blue', 'P', null, true
    );
    const textNodeThree: TextNode = new TextNode(
      this.gridMeta, 'n-2',
      this.gridMeta.COORDINATE_WIDTH * 2,
      this.gridMeta.COORDINATE_HEIGHT * 10,
      'blue', 'F', null, true
    );
    const textNodeFour: TextNode = new TextNode(
      this.gridMeta, 'n-3',
      this.gridMeta.COORDINATE_WIDTH * 2,
      this.gridMeta.COORDINATE_HEIGHT * 4,
      'blue', 'T', null, true
    );

    const items = textNodeOne.getRenderItems();
    for (let i = 0; i < items.length; i++) {
      frame.addDelta(items[i]);
    }

    const itemsTwo = textNodeTwo.getRenderItems();
    for (let i = 0; i < itemsTwo.length; i++) {
      frame.addDelta(itemsTwo[i]);
    }

    const itemsThree = textNodeThree.getRenderItems();
    for (let i = 0; i < itemsThree.length; i++) {
      frame.addDelta(itemsThree[i]);
    }

    const itemsFour = textNodeFour.getRenderItems();
    for (let i = 0; i < itemsFour.length; i++) {
      frame.addDelta(itemsFour[i]);
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

    // Adjust edges
    /********************** Edges **********************/
    /** e-0 ********************************************/
    const edge: Edge = new Edge(
      'e-0', this.gridMeta, nodeTwo, nodeOne, ArcType.CURVE, ArrowType.EAST
    );

    const items2 = edge.getRenderItems();
    for (let i = 0; i < items2.length; i++) {
      frame.addDelta(items2[i]);
    }

    /** e-1 ********************************************/
    const edge0: Edge = new Edge(
      'e-1', this.gridMeta, nodeTwo, nodeThree, ArcType.CURVE, ArrowType.EAST
    );

    const items3 = edge0.getRenderItems();
    for (let i = 0; i < items3.length; i++) {
      frame.addDelta(items3[i]);
    }

    /** e-2 ********************************************/
    const edge1: Edge = new Edge(
      'e-2', this.gridMeta, nodeFour, nodeTwo, ArcType.CURVE, ArrowType.EAST
    );

    const items4 = edge1.getRenderItems();
    for (let i = 0; i < items4.length; i++) {
      frame.addDelta(items4[i]);
    }

    return frame;
  }

  /**
   * Transition Nodes to tree Form
   * @returns {Frame}
   */
  createFrame7(): Frame {
    const frame: Frame = new Frame();

    const textNodeOne: TextNode = new TextNode(
      this.gridMeta, 'n-0',
      this.gridMeta.COORDINATE_WIDTH * 1,
      this.gridMeta.COORDINATE_HEIGHT,
      'blue', 'U', null, true
    );
    const textNodeTwo: TextNode = new TextNode(
      this.gridMeta, 'n-1',
      this.gridMeta.COORDINATE_WIDTH * 10,
      this.gridMeta.COORDINATE_HEIGHT * 2,
      'blue', 'P', null, true
    );
    const textNodeThree: TextNode = new TextNode(
      this.gridMeta, 'n-2',
      this.gridMeta.COORDINATE_WIDTH * 1,
      this.gridMeta.COORDINATE_HEIGHT * 8,
      'blue', 'F', null, true
    );
    const textNodeFour: TextNode = new TextNode(
      this.gridMeta, 'n-3',
      this.gridMeta.COORDINATE_WIDTH * 22,
      this.gridMeta.COORDINATE_HEIGHT * 2,
      'blue', 'T', null, true
    );

    const items = textNodeOne.getRenderItems();
    for (let i = 0; i < items.length; i++) {
      frame.addDelta(items[i]);
    }

    const itemsTwo = textNodeTwo.getRenderItems();
    for (let i = 0; i < itemsTwo.length; i++) {
      frame.addDelta(itemsTwo[i]);
    }

    const itemsThree = textNodeThree.getRenderItems();
    for (let i = 0; i < itemsThree.length; i++) {
      frame.addDelta(itemsThree[i]);
    }

    const itemsFour = textNodeFour.getRenderItems();
    for (let i = 0; i < itemsFour.length; i++) {
      frame.addDelta(itemsFour[i]);
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

    // Adjust edges
    /********************** Edges **********************/
    /** e-0 ********************************************/
    const edge: Edge = new Edge(
      'e-0', this.gridMeta, nodeTwo, nodeOne, ArcType.LINE_STRAIGHT, ArrowType.EAST
    );

    const items2 = edge.getRenderItems();
    for (let i = 0; i < items2.length; i++) {
      frame.addDelta(items2[i]);
    }

    /** e-1 ********************************************/
    const edge0: Edge = new Edge(
      'e-1', this.gridMeta, nodeTwo, nodeThree, ArcType.LINE_STRAIGHT, ArrowType.EAST
    )

    const items3 = edge0.getRenderItems();
    for (let i = 0; i < items3.length; i++) {
      frame.addDelta(items3[i]);
    }

    /** e-2 ********************************************/
    const edge1: Edge = new Edge(
      'e-2', this.gridMeta, nodeFour, nodeTwo, ArcType.LINE_STRAIGHT, ArrowType.EAST
    );

    const items4 = edge1.getRenderItems();
    for (let i = 0; i < items4.length; i++) {
      frame.addDelta(items4[i]);
    }

    return frame;
  }

  /**
   * Make nodes square again
   * @returns {Frame}
   */
  createFrame8(): Frame {
    const frame: Frame = new Frame();

    const textNodeOne: TextNode = new TextNode(
      this.gridMeta, 'n-0',
      this.gridMeta.COORDINATE_WIDTH * 1,
      this.gridMeta.COORDINATE_HEIGHT,
      'blue', 'U', null, false
    );
    const textNodeTwo: TextNode = new TextNode(
      this.gridMeta, 'n-1',
      this.gridMeta.COORDINATE_WIDTH * 10,
      this.gridMeta.COORDINATE_HEIGHT * 2,
      'blue', 'P', null, false
    );
    const textNodeThree: TextNode = new TextNode(
      this.gridMeta, 'n-2',
      this.gridMeta.COORDINATE_WIDTH * 1,
      this.gridMeta.COORDINATE_HEIGHT * 8,
      'blue', 'F', null, false
    );
    const textNodeFour: TextNode = new TextNode(
      this.gridMeta, 'n-3',
      this.gridMeta.COORDINATE_WIDTH * 22,
      this.gridMeta.COORDINATE_HEIGHT * 2,
      'blue', 'T', null, false
    );

    const items = textNodeOne.getRenderItems();
    for (let i = 0; i < items.length; i++) {
      frame.addDelta(items[i]);
    }

    const itemsTwo = textNodeTwo.getRenderItems();
    for (let i = 0; i < itemsTwo.length; i++) {
      frame.addDelta(itemsTwo[i]);
    }

    const itemsThree = textNodeThree.getRenderItems();
    for (let i = 0; i < itemsThree.length; i++) {
      frame.addDelta(itemsThree[i]);
    }

    const itemsFour = textNodeFour.getRenderItems();
    for (let i = 0; i < itemsFour.length; i++) {
      frame.addDelta(itemsFour[i]);
    }

    return frame;
  }

  /**
   *  - TODO: Shift all nodes up for the 'final arrangement' and finish this frame
   *  - Expand label
   *  - add in an empty bBox
   *  - draw a csv file table */
  createFrame9(): Frame {
    const frame: Frame = new Frame();

    const textNodeOne: TextNode = new TextNode(
      this.gridMeta, 'n-0',
      this.gridMeta.COORDINATE_WIDTH * 1,
      this.gridMeta.COORDINATE_HEIGHT,
      'blue', 'User', null, false
    );
    const textNodeTwo: TextNode = new TextNode(
      this.gridMeta, 'n-1',
      this.gridMeta.COORDINATE_WIDTH * 10,
      this.gridMeta.COORDINATE_HEIGHT * 2,
      'blue', 'UserProfile', null, false
    );
    const textNodeThree: TextNode = new TextNode(
      this.gridMeta, 'n-2',
      this.gridMeta.COORDINATE_WIDTH * 1,
      this.gridMeta.COORDINATE_HEIGHT * 8,
      'blue', 'Firm', null, false
    );
    const textNodeFour: TextNode = new TextNode(
      this.gridMeta, 'n-3',
      this.gridMeta.COORDINATE_WIDTH * 22,
      this.gridMeta.COORDINATE_HEIGHT * 2,
      'blue', '-Tag-', null, false
    );

    const items = textNodeOne.getRenderItems();
    for (let i = 0; i < items.length; i++) {
      frame.addDelta(items[i]);
    }

    const itemsTwo = textNodeTwo.getRenderItems();
    for (let i = 0; i < itemsTwo.length; i++) {
      frame.addDelta(itemsTwo[i]);
    }

    const itemsThree = textNodeThree.getRenderItems();
    for (let i = 0; i < itemsThree.length; i++) {
      frame.addDelta(itemsThree[i]);
    }

    const itemsFour = textNodeFour.getRenderItems();
    for (let i = 0; i < itemsFour.length; i++) {
      frame.addDelta(itemsFour[i]);
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

    // Adjust edges
    /********************** Edges **********************/
    /** e-0 ********************************************/
    const edge: Edge = new Edge(
      'e-0', this.gridMeta, nodeTwo, nodeOne, ArcType.LINE_STRAIGHT, ArrowType.EAST
    );

    const items2 = edge.getRenderItems();
    for (let i = 0; i < items2.length; i++) {
      frame.addDelta(items2[i]);
    }

    /** e-1 ********************************************/
    const edge0: Edge = new Edge(
      'e-1', this.gridMeta, nodeTwo, nodeThree, ArcType.LINE_STRAIGHT, ArrowType.EAST
    );

    const items3 = edge0.getRenderItems();
    for (let i = 0; i < items3.length; i++) {
      frame.addDelta(items3[i]);
    }

    /** e-2 ********************************************/
    const edge1: Edge = new Edge(
      'e-2', this.gridMeta, nodeFour, nodeTwo, ArcType.LINE_STRAIGHT, ArrowType.EAST
    );

    const items4 = edge1.getRenderItems();
    for (let i = 0; i < items4.length; i++) {
      frame.addDelta(items4[i]);
    }
    return frame;
  }

  /**
   * Draw BBoxes, and add csv file image
   */
  createFrame10(): Frame {
    const frame: Frame = new Frame();

    const textNodeOne: TextNode = new TextNode(
      this.gridMeta, 'n-0',
      this.gridMeta.COORDINATE_WIDTH * 1,
      this.gridMeta.COORDINATE_HEIGHT,
      'blue', 'User', null, false
    );
    const textNodeTwo: TextNode = new TextNode(
      this.gridMeta, 'n-1',
      this.gridMeta.COORDINATE_WIDTH * 10,
      this.gridMeta.COORDINATE_HEIGHT * 2,
      'blue', 'UserProfile', null, false
    );
    const textNodeThree: TextNode = new TextNode(
      this.gridMeta, 'n-2',
      this.gridMeta.COORDINATE_WIDTH * 1,
      this.gridMeta.COORDINATE_HEIGHT * 8,
      'blue', 'Firm', null, false
    );
    const textNodeFour: TextNode = new TextNode(
      this.gridMeta, 'n-3',
      this.gridMeta.COORDINATE_WIDTH * 22,
      this.gridMeta.COORDINATE_HEIGHT * 2,
      'blue', '-Tag-', null, false
    );

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

    /**************** Bar-Boxes ***********************************************/
    const barBoxOne: BarBox = new BarBox(
      this.gridMeta, 'green', nodeOne
    );
    barBoxOne.addRow('e_{0}', '{}');

    const barBoxTwo: BarBox = new BarBox(
      this.gridMeta, 'green', nodeTwo
    );
    barBoxTwo.addRow('e_{0}', '{}');

    const barBoxThree: BarBox = new BarBox(
      this.gridMeta, 'green', nodeThree
    );
    barBoxThree.addRow('e_{0}', '{}');

    const barBoxFour: BarBox = new BarBox(
      this.gridMeta, 'green', nodeFour
    );
    barBoxFour.addRow('e_{0}', '{}');

    const itemsFive: Array<RenderItem> = barBoxOne.getRenderItems();
    for (let i = 0; i < itemsFive.length; i++) {
      frame.addItem(itemsFive[i]);
    }

    const itemsSix: Array<RenderItem> = barBoxTwo.getRenderItems();
    for (let i = 0; i < itemsSix.length; i++) {
      frame.addItem(itemsSix[i]);
    }

    const items0: Array<RenderItem> = barBoxThree.getRenderItems();
    for (let i = 0; i < items0.length; i++) {
      frame.addItem(items0[i]);
    }

    const items1: Array<RenderItem> = barBoxFour.getRenderItems();
    for (let i = 0; i < items1.length; i++) {
      frame.addItem(items1[i]);
    }

    const gridTable: GridTable = new GridTable(
      this.gridMeta, 4, 4,
      this.gridMeta.COORDINATE_WIDTH * 22,
      this.gridMeta.COORDINATE_HEIGHT * 12,
      ['u', 'f', 'p', 't'], 'CSV File'
    );
    // gridTable.highlightPoint(2, 2);
    const gridItems = gridTable.getRenderItems();
    for (let i = 0; i < gridItems.length; i++) {
      frame.addItem(gridItems[i]);
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
    this.frames.push(
      this.createFrame2()
    );
    this.frames.push(
      this.createFrame3()
    );
    this.frames.push(
      this.createFrame4()
    );
    this.frames.push(
      this.createFrame5()
    );
    this.frames.push(
      this.createFrame5a()
    );
    this.frames.push(
      this.createFrame6()
    );
    this.frames.push(
      this.createFrame7()
    );
    this.frames.push(
      this.createFrame8()
    );
    this.frames.push(
      this.createFrame9()
    );
    this.frames.push(
      this.createFrame10()
    );

    this.frames[0].setNext(this.frames[1]);
    this.frames[1].setNext(this.frames[2]);
    this.frames[2].setNext(this.frames[3]);
    this.frames[3].setNext(this.frames[4]);
    this.frames[4].setNext(this.frames[5]);
    this.frames[5].setNext(this.frames[6]);
    this.frames[6].setNext(this.frames[7]);
    this.frames[7].setNext(this.frames[8]);
    this.frames[8].setNext(this.frames[9]);
    this.frames[9].setNext(this.frames[10]);
    this.frames[10].setNext(this.frames[11]);

    this.frames[0].render();
    this.frames[0].transition();
  }
}
