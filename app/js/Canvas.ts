const Canvas = new class CanvasSingleton {

  public canvas: HTMLCanvasElement = document.querySelector(".canvas");
  public ctx: CanvasRenderingContext2D = this.canvas.getContext("2d");

  constructor() {
    window.addEventListener("resize", () => {
      this.setCanvasSize();
    });
    this.setCanvasSize();
  }

  private setCanvasSize() {
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
  }

}();

export const canvas = Canvas.canvas;
export const ctx = Canvas.canvas.getContext("2d");
