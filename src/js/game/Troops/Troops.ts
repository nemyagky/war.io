import * as BABYLON from "babylonjs";
import { Scene } from "./../Rendering/Scene";

export const Troops = new (class TroopsSingleton {
  public init() {
    // Add and manipulate meshes in the scene
    const box = BABYLON.MeshBuilder.CreateBox(
      "box",
      { height: 1, width: 0.75, depth: 0.5 },
      Scene
    );

    const countInRow = 20;

    for (let x = 0; x < countInRow * 2; x += 2) {
      for (let y = 0; y < countInRow * 2; y += 2) {
        for (let z = 0; z < countInRow * 2; z += 2) {
          box.createInstance("box" + x + y + z);
          box.position.set(x, y, z);
        }
      }
    }
  }
})();
