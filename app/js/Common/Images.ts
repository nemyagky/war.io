const Images = new class ImagesSingleton {

  public images = {
    blackhole: this.createImage("blackhole-blue.png")
  };

  private directory: string = "/app/imgs/";

  private createImage(src: string) {
    const image = new Image();
    image.src = this.directory + src;
    return image;
  }

}();

export const images = Images.images;
