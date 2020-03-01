import * as THREE from "three";
import { Scene } from "../Rendering/Scene";

export const Troops = new (class TroopsSingleton {
  public init() {
    const light = new THREE.HemisphereLight(0xffffff, 0x000088);
    light.position.z = 5;
    Scene.add(light);

    const loader = new THREE.BufferGeometryLoader();
    loader.load("http://localhost:8080/src/models/head.json", geometry => {
      const countInRow = 17;
      const totalCount = Math.pow(countInRow, 3);
      const material = new THREE.MeshPhongMaterial({ flatShading: true });

      const mesh = new THREE.InstancedMesh(geometry, material, totalCount);
      let i = 0;
      const offset = (countInRow - 1) / 2;
      const transform = new THREE.Object3D();
      for (let x = 0; x < countInRow * 2; x += 2) {
        for (let y = 0; y < countInRow * 2; y += 2) {
          for (let z = 0; z < countInRow * 2; z += 2) {
            transform.position.set(offset - x, offset - y, offset - z);
            transform.updateMatrix();
            mesh.setMatrixAt(i++, transform.matrix);
          }
        }
      }
      Scene.add(mesh);
    });
  }
})();
