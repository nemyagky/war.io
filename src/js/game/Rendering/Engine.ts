import * as BABYLON from "babylonjs";
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

export const Engine = new BABYLON.Engine(canvas, true);
