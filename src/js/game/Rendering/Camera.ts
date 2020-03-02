import * as THREE from "three";

export const Camera = new (class CameraSingleton {
  private camera: THREE.PerspectiveCamera;

  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 25);
  }

  public getCamera() {
    return this.camera;
  }
})();
