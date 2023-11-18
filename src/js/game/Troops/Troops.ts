import * as THREE from "three";
import { Scene } from "../Rendering/Scene";

export const Troops = new (class TroopsSingleton {
  public init() {
    const light = new THREE.HemisphereLight(0xffffff, 0x000088);
    light.position.z = 5;
    Scene.add(light);

    const countInRow = 100;
    const totalCount = Math.pow(countInRow, 3);

    alert(`Rendering ${totalCount} squares. MacOS M1 Pro: 1 million works fine, 3m ~30 fps`);

    const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    const material = new THREE.MeshPhysicalMaterial({ color: 0xffffff });

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
  }
})();
