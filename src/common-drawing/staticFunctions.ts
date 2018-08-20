import * as d3 from 'd3';
import {GridPoint} from './GridPoint';

// TODO: These function definitions seem a bit wonky -- explore alternatives
export function straightLine(points: Array<GridPoint>) {
  const tmpFunc = d3.line()
    .x(function (d) {
      return d[0];
    })
    .y(function (d) {
      return d[1];
    });

  const tarray: Array<[number, number]> = [];
  for (let i = 0; i < points.length; i++) {
    tarray.push([
      points[i].x, points[i].y
    ]);
  }
  return tmpFunc(tarray);
}

export function arcLine(points: Array<GridPoint>) {
  const tmpFunc = d3.line()
    .x(function(d) { return d[0]; })
    .y(function(d) { return d[1]; })
    .curve(d3.curveBasis);

  const tarray: Array<[number, number]> = [];
  for (let i = 0; i < points.length; i++) {
    tarray.push([
      points[i].x, points[i].y
    ]);
  }
  return tmpFunc(tarray);
}
