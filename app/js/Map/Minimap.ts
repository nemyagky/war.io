import { canvas, ctx } from "../canvas";

export const MiniMap = new class MiniMapSingleton {

  private width: number;
  private height: number;

  private maxW: number = 400;
  private minW: number = 250;
  private heightCoef: number = 1.8;

  private color: string = "#FFFFFF";

  constructor() {
    this.setSize();

    window.addEventListener("resize", () => {
      this.setSize();
    });
  }

  private draw() {
    this.drawBorder();
  }

  /**
   * Set Minimap size according to window.width
   */
  private setSize() {
    const width = window.innerWidth / 3.85;

    if (width > this.maxW) {
      this.width = this.maxW;
    } else if (width < this.minW) {
      this.width = this.minW;
    } else {
      this.width = width;
    }

    this.height = this.width / this.heightCoef;
  }

  private drawBorder() {
    ctx.beginPath();
    ctx.strokeStyle = "#fff";
    ctx.rect(1, (canvas.height - this.height - 2), this.width + 5, this.height);
    ctx.stroke();
    ctx.closePath();
  }

}();
