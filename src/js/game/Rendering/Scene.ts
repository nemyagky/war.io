import * as BABYLON from "babylonjs";
import { Engine } from "./Engine";
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

export const Scene = new BABYLON.Scene(Engine);

// TODO: Пока инизиализируем камеру здесь. Потом, когда камеру можно будет двигать и все такое, надо создать
// Отдельный модуль для камеры
const Camera = new BABYLON.FreeCamera(
  "camera",
  new BABYLON.Vector3(0, 5, -10),
  Scene
);

Camera.setTarget(BABYLON.Vector3.Zero());
Camera.attachControl(canvas, false);
Camera.position.set(0, 5, 20);
Camera.setTarget(new BABYLON.Vector3(0, 0, 0));

// TODO: Пока инициализируем свет здесь. Потом надо создать отдельный модуль для освещения
const light1 = new BABYLON.HemisphericLight(
  "light1",
  new BABYLON.Vector3(1, 1, 0),
  Scene
);
const light2 = new BABYLON.PointLight(
  "light2",
  new BABYLON.Vector3(0, 1, -1),
  Scene
);
