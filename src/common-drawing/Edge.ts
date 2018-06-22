import {isNullOrUndefined} from 'util';

import { straightLine, arcLine } from '../common-drawing/staticFunctions';

import { Node } from './Node';
import { GridMeta } from './GridMeta';
import { GridPoint } from './GridPoint';
import { RenderItem } from '../common-simulation/RenderItem';

// TODO: Edge drawing is really something you should be digging into the literature to do better
// TODO) (/checking out Bostock's code)

export enum ArcType {
  CURVE,
  LINE_STRAIGHT,
  LINE_KINKED
}

/**
 *          NORTH
 *            \/
 *         |-----|
 * WEST >  |     | < EAST
 *         |-----|
 *            ^
 *          SOUTH
 */
export enum ArrowType {
  NORTH,
  SOUTH,
  EAST,
  WEST
}

export class Edge {
  // static size of arrow tip - TODO - make this an input for the constructor
  private static ARROW_LEN = 10;
  private id: string;
  private gridMeta: GridMeta;
  private source: Node;
  private target: Node;

  // Arc specifications
  private arcType: ArcType;
  private arrowType: ArrowType;

  private sourcePoint: GridPoint;
  private targetPoint: GridPoint;

  private manualSource: GridPoint;
  private manualTarget: GridPoint;

  private arrowTip: Array<GridPoint>;
  private edgePoints: Array<GridPoint>;

  constructor(id: string, gridMeta: GridMeta, source: Node, target: Node,
              arcType: ArcType, arrowType: ArrowType) {
    this.id = id;
    this.gridMeta = gridMeta;
    this.source = source;
    this.target = target;

    this.arcType = arcType;
    this.arrowType = arrowType;
  }

  setManualTargets(source: GridPoint, target: GridPoint): void {
    this.manualSource = source;
    this.manualTarget = target;
  }

  getRenderItems(): Array<RenderItem> {
    this.edgePoints = this.getLinePoints();

    const arrowTipItem: RenderItem = new RenderItem(`tip-${this.id}`, 'svg', 'path');
    const edgeItem: RenderItem = new RenderItem(this.id, 'svg', 'path');

    arrowTipItem.addAttr('d', straightLine(this.arrowTip));
    arrowTipItem.addAttr('stroke', 'blue');
    arrowTipItem.addAttr('stroke-width', 1);
    arrowTipItem.addAttr('fill', 'none');

    if (this.arcType === ArcType.CURVE) {
      edgeItem.addAttr('d', arcLine(this.edgePoints));
    } else {
      edgeItem.addAttr('d', straightLine(this.edgePoints));
    }
    edgeItem.addAttr('stroke', 'blue');
    edgeItem.addAttr('stroke-width', 1);
    edgeItem.addAttr('fill', 'none');

    return [edgeItem, arrowTipItem];
  }

  getLinePoints(): Array<GridPoint> {
    this.arrowTip = this.getArrowHead();
    this.setSourceTargetPoints();

    if (this.arcType === ArcType.CURVE) {
      return this.getCurvedEdge(
        this.sourcePoint,
        this.targetPoint
      );

    } else if (this.arcType === ArcType.LINE_STRAIGHT) {
      return [this.sourcePoint, this.targetPoint];

    } else if (this.arcType === ArcType.LINE_KINKED) {
      return this.getKinkedEdge(
        this.sourcePoint,
        this.targetPoint
      );

    }
  }

  /**
   * @s source point
   * @p target point
   * given input, draw 2 grid points b/w source and target
   */
  getKinkedEdge(s: GridPoint, t: GridPoint): Array<GridPoint> {
    const points: Array<GridPoint> = [];
    const buffer = 12;
    let midPointOne: GridPoint;
    let midPointTwo: GridPoint;

    if (this.arrowType === ArrowType.NORTH) {
      midPointOne = {
        x: s.x,
        y: Math.min(s.y, t.y) - buffer
      };
      midPointTwo = {
        x: t.x,
        y: Math.min(s.y, t.y) - buffer
      };

    } else if (this.arrowType === ArrowType.SOUTH) {
      midPointOne = {
        x: s.x,
        y: Math.max(s.y, t.y) + buffer
      };
      midPointTwo = {
        x: t.x,
        y: Math.max(s.y, t.y) + buffer
      };

    } else if (this.arrowType === ArrowType.EAST) {
      midPointOne = {
        x: Math.max(s.x, t.x) + buffer,
        y: s.y
      };
      midPointTwo = {
        x: Math.max(s.x, t.x) + buffer,
        y: t.y
      };

    } else if (this.arrowType === ArrowType.WEST) {
      midPointOne = {
        x: Math.min(s.x, t.x) - buffer,
        y: s.y
      };
      midPointTwo = {
        x: Math.min(s.x, t.x) - buffer,
        y: t.y
      };

    }

    points.push(s);
    points.push(midPointOne);
    points.push(midPointTwo);
    points.push(t);
    return points;
  }

  /**
   * @s source point
   * @p target point
   * given input, draw 1 GridPoint b/w source and target
   */
  getCurvedEdge(s: GridPoint, t: GridPoint): Array<GridPoint> {
    const points: Array<GridPoint> = [];
    // x 5 Rule based soley on observation of personal aesthetic preferences
    const buffer = Edge.ARROW_LEN * 5;
    let midPoint: GridPoint;

    if (this.arrowType === ArrowType.NORTH) {
      midPoint = {
        x: s.x + (t.x - s.x) / 2,
        y: Math.min(s.y, t.y) - buffer
      };
    } else if (this.arrowType === ArrowType.SOUTH) {
      midPoint = {
        x: s.x + (t.x - s.x) / 2,
        y: Math.max(s.y, t.y) + buffer
      };
    } else if (this.arrowType === ArrowType.EAST) {
      midPoint = {
        x: Math.min(s.x, t.x) + buffer,
        y: s.y + (t.y - s.y) / 2
      };
    } else if (this.arrowType === ArrowType.WEST) {
      midPoint = {
        x: Math.min(s.x, t.x) - buffer,
        y: s.y + (t.y - s.y) / 2
      };
    }

    points.push(s);
    points.push(midPoint);
    points.push(t);
    return points;
  }

  /**
   * N.B: Mathematical assumptions - target (node) (x,y) coordinates indicate the upper left of the shape */
  getArrowHead(): Array<GridPoint> {
    const points: Array<GridPoint> = [];
    let tip: GridPoint;
    let wingRight: GridPoint;
    let wingLeft: GridPoint;

    if (this.arrowType === ArrowType.NORTH) {
      // ==> tip is the middle of this.target upper surface
      if (isNullOrUndefined(this.manualTarget)) {
        tip = {
          x: this.gridMeta.X_ORIGIN + this.target.x + this.target.width / 2,
          y: this.gridMeta.Y_ORIGIN + this.target.y
        };
      } else {
        tip = this.manualTarget;
      }
      wingLeft = {
        x: tip.x - Edge.ARROW_LEN / 2 ,
        y: tip.y - Edge.ARROW_LEN,
      };
      wingRight = {
        x: tip.x + Edge.ARROW_LEN / 2 ,
        y: tip.y - Edge.ARROW_LEN,
      };
    } else if (this.arrowType === ArrowType.SOUTH) {
      // ==> tip is in the middle of the bottom surface
      if (isNullOrUndefined(this.manualTarget)) {
        tip = {
          x: this.gridMeta.X_ORIGIN + this.target.x + this.target.width / 2,
          y: this.gridMeta.Y_ORIGIN + this.target.y + this.target.height
        };
      } else {
        tip = this.manualTarget;
      }
      wingLeft = {
        x: tip.x - Edge.ARROW_LEN / 2 ,
        y: tip.y + Edge.ARROW_LEN,
      };
      wingRight = {
        x: tip.x + Edge.ARROW_LEN / 2 ,
        y: tip.y + Edge.ARROW_LEN,
      };

    } else if (this.arrowType === ArrowType.EAST) {
      // ==> tip pointed at middle of the right surface
      if (isNullOrUndefined(this.manualTarget)) {
        tip = {
          x: this.gridMeta.X_ORIGIN + this.target.x + this.target.width,
          y: this.gridMeta.Y_ORIGIN + this.target.y + this.target.height / 2
        };
      } else {
        tip = this.manualTarget;
      }
      wingLeft = {
        x: tip.x + Edge.ARROW_LEN,
        y: tip.y - Edge.ARROW_LEN / 2,
      };
      wingRight = {
        x: tip.x + Edge.ARROW_LEN,
        y: tip.y + Edge.ARROW_LEN / 2,
      };
    } else if (this.arrowType === ArrowType.WEST) {
      // ==> tip pointed at middle of the left surface
      if (isNullOrUndefined(this.manualTarget)) {
        tip = {
          x: this.gridMeta.X_ORIGIN + this.target.x,
          y: this.gridMeta.Y_ORIGIN + this.target.y + this.target.height / 2
        };
      } else {
        tip = this.manualTarget;
      }
      wingLeft = {
        x: tip.x - Edge.ARROW_LEN,
        y: tip.y - Edge.ARROW_LEN / 2,
      };
      wingRight = {
        x: tip.x - Edge.ARROW_LEN,
        y: tip.y + Edge.ARROW_LEN / 2,
      };
    }

    // Draw triangle clockwise;
    points.push(wingLeft);
    points.push(tip);
    points.push(wingRight);
    points.push(wingLeft);
    return points;
  }

  setSourceTargetPoints(): void {
    // First calculate source and target grid points
    if (isNullOrUndefined(this.manualSource)) {

      if (this.arrowType === ArrowType.NORTH ) { // *******  NORTH
        if (this.arcType === ArcType.LINE_STRAIGHT) {
          // ==> source pointing down from middle of bottom surface
          this.sourcePoint = {
            x: this.source.x + this.source.width / 2,
            y: this.source.y + this.source.height
          };

        } else {
          // ==> source pointing north from middle of north surface
          this.sourcePoint = {
            x: this.source.x + this.source.width / 2,
            y: this.source.y
          };

        }
        this.targetPoint = {
          x: this.arrowTip[1].x,
          y: this.arrowTip[1].y - Edge.ARROW_LEN
        };
      } else if (this.arrowType === ArrowType.SOUTH ) { // *******  SOUTH
        if (this.arcType === ArcType.LINE_STRAIGHT) {
          // ==> source pointing up from middle of top surface
          this.sourcePoint = {
            x: this.source.x + this.source.width / 2,
            y: this.source.y
          };
        } else {
          // ==> source pointing south from middle of south surface
          this.sourcePoint = {
            x: this.source.x + this.source.width / 2,
            y: this.source.y + this.source.height
          };
        }
        this.targetPoint = {
          x: this.arrowTip[1].x,
          y: this.arrowTip[1].y + Edge.ARROW_LEN
        };
      } else if (this.arrowType === ArrowType.EAST ) { // *******  EAST
        if (this.arcType === ArcType.LINE_STRAIGHT) {
          // ==> source pointing west from middle of west surface
          this.sourcePoint = {
            x: this.source.x,
            y: this.source.y + this.source.height / 2
          };
        } else {
          // ==> source pointing east from middle of east surface
          this.sourcePoint = {
            x: this.source.x + this.source.width,
            y: this.source.y + this.source.height / 2
          };
        }
        this.targetPoint = {
          x: this.arrowTip[1].x + Edge.ARROW_LEN,
          y: this.arrowTip[1].y
        };
      } else if (this.arrowType === ArrowType.WEST ) { // *******  WEST
        if (this.arcType === ArcType.LINE_STRAIGHT) {
          // ==> source pointing east from middle of east surface
          this.sourcePoint = {
            x: this.source.x + this.source.width,
            y: this.source.y + this.source.height / 2
          };

        } else {
          // ==> source pointing west from middle of west surface
          this.sourcePoint = {
            x: this.source.x,
            y: this.source.y + this.source.height / 2
          };
        }
        this.targetPoint = {
          x: this.arrowTip[1].x - Edge.ARROW_LEN,
          y: this.arrowTip[1].y
        };
      }

    } else {
      this.sourcePoint = this.manualSource;
      this.targetPoint = this.manualTarget;

    }
    this.sourcePoint.x = this.sourcePoint.x + this.gridMeta.X_ORIGIN;
    this.sourcePoint.y = this.sourcePoint.y + this.gridMeta.Y_ORIGIN;
  }
}
