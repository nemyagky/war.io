const Ctx = new class CtxSingleton {

  public canvas: HTMLCanvasElement = document.querySelector(".canvas");
  public ctx: CanvasRenderingContext2D = this.canvas.getContext("2d");

  constructor() {
    this.setCanvasSize();
    window.addEventListener("resize", () => {
      this.setCanvasSize();
    });
  }

  private setCanvasSize() {
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
  }

}();

export let canvas = Ctx.canvas;
export let ctx = Ctx.canvas.getContext("2d");
