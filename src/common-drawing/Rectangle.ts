import * as d3 from 'd3';

export class Rectangle { // Should really be called 'textBox' because of the label
  id: string; // Css
  x: number;
  y: number;
  rx: number;
  ry: number;
  width: number;
  height: number;
  color: string;
  label: string;

  constructor(id, x, y, rx, ry, width, height, color, label) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.rx = rx;
    this.ry = ry;
    this.width = width;
    this.height = height;
    this.color = color;
    this.label = label;
  }

  transition(x_orig: number, y_orig: number, vertical_text_padding: number = 0) {
    // This could be really sophisticated, and simply look for everything that's changed and transition it (for now just
    // transition the things we know are changing

    // Update any change in width
    d3.select(`svg rect#${this.id}`)
      .transition()
      .duration(500)
      .attr('width', this.width)
      .on('end', function() {
        this.toCircle();
      }.bind(this) );

    // Note - Without this chaining above sometimes rx changes first, and then width to produce
    // an elipse instead of a circle form

    // Update any change in label
    d3.select(`svg text#l-${this.id}`)
      .transition()
      .attr('x', this.x + x_orig + this.width / 2)
      .attr('y', this.y + y_orig + this.height / 2 + vertical_text_padding)
      .text( this.label );
  }

  toCircle() {
    d3.select(`svg rect#${this.id}`)
      .transition()
      .duration(500)
      .attr('rx', this.rx)
      .attr('ry', this.ry);

  }
 }
