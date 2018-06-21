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
}
