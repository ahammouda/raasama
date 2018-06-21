export class Node {
  public id: string; // Css
  public x: number;
  public y: number;
  public rx: number;
  public ry: number;
  public width: number;
  public height: number;
  public color: string;

  constructor(rounded: boolean = false) {
    if (rounded) {
      this.rx = 100;
      this.ry = 100;
    } else {
      this.rx = 0;
      this.ry = 0;
    }
  }
}
