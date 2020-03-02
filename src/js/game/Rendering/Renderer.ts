import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Camera } from "./Camera";
import { Scene } from "./Scene";

export const Renderer = new (class RendererSingleton {
  private renderer = new THREE.WebGLRenderer({ antialias: true });

  constructor() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);

    const orbitControls = new OrbitControls(
      Camera.getCamera(),
      this.renderer.domElement
    );
  }

  public render() {
    this.renderer.render(Scene, Camera.getCamera());
  }
})();
