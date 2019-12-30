import * as d3 from "d3-quadtree";
import { QuadtreeItem } from "../../interfaces/QuadtreeItem.interface";
import { ctx } from "./Ctx";

export const Functions = new class FunctionsSingleton {

  private ctxColor: string;

  // Used to calc fps count
  private prevRenderTime: number = new Date().getMilliseconds();
  private fpsCount: number = 1;
  private fps: number = 0;

  public drawFps() {
    this.setColor("#fff");
    ctx.font = "20pt Arial";
    // ctx.fillText("Итераций: " + iterations, 10, 130);
    ctx.fillText("FPS: " + this.countFPS(), 10, 80);
  }

  public countFPS(): number {
    const currentLoop = new Date().getMilliseconds();

    if (this.prevRenderTime > currentLoop) {
      this.fps = this.fpsCount;
      this.fpsCount = 1;
    } else {
      this.fpsCount += 1;
    }

    this.prevRenderTime = currentLoop;
    return this.fps;
  }

  public rand(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  /** @param a Angle in degrees */
  public toRad(a: number): number {
    return a * Math.PI / 180;
  }

  /** @param a Angle in radians */
  public toDegrees(a: number): number {
    return a * 180 / Math.PI;
  }

  /**
   * Rotate canvas while rendering to it. After calling this func, we need to draw an object and use ctx.restore()
   * @param dx center x cords
   * @param dy center y cords
   * @param a rotate in degrees
   */
  public rotateCanvasCtx(dx: number, dy: number, a: number) {
    ctx.save();
    ctx.translate(dx, dy);
    ctx.rotate(this.toRad(a));
    ctx.translate(-dx, -dy);
  }

  /**
   * Used for optimization, because changing ctx color - costly operation
   *  (if you are interesting - it takes 30% more time)
   */
  public setColor(newColor: string) {
    if (this.ctxColor !== newColor) {
      ctx.fillStyle = newColor;
      this.ctxColor = newColor;
    }
  }

  /**
   * @param dot1 {x, y}
   * @param dot2 {x, y}
   * @returns dist between 2 dots by Pythagorean theorem
   */
  public getDistBetween2dots(dot1: { x: number, y: number }, dot2: { x: number, y: number }): number {
    const a = dot1[0] - dot2[0];
    const b = dot1[1] - dot2[1];

    return Math.sqrt(a * a + b * b);
  }

  // TODO delete this function
  public toQuadtree(array: QuadtreeItem[]) {
    const quadtree = d3.quadtree();

    array.forEach((item: QuadtreeItem) => {
      quadtree.add([item.x, item.y, item]);
    });

    return quadtree;
  }

  public toQuadtreeWithBorders(array: QuadtreeItem[]) {
    const quadtree = d3.quadtree();

    quadtree.top = Infinity;
    quadtree.left = Infinity;

    array.forEach((item: QuadtreeItem) => {
      quadtree.add([item.x, item.y, item]);

      if (item.x < quadtree.left) { quadtree.left = item.x; }
      if (item.y < quadtree.top) { quadtree.top = item.y; }
    });

    return quadtree;
  }

  /**
   * Transform array of arrays into array [][] => []
   * @param multidimensionalArray array of arrays
   */
  public toOneDimensionalArray(multidimensionalArray: any[][]): [] {
    return Array.prototype.concat.apply([], multidimensionalArray);
  }

}();
