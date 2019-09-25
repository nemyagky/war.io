import './../sass/main.sass';
//import {canvas} from './init';
import * as THREE from 'three';

// Creating images just per page loading
window.addEventListener("load", gameLoop())


// Main project function. 60 times per second drawing and changing everything
// Objects are drawing depending on calling in this function. If we need to draw some object on the top layer - we need to call it earlier
function gameLoop() {

	let canvas = document.querySelector('canvas')
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	let renderer = new THREE.WebGLRenderer({canvas: canvas})
	renderer.setClearColor('#000')

	let scene = new THREE.Scene()
	let camera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 0.1, 5000)
	camera.position.set(0, 0, 1000)
	
	let light = new THREE.AmbientLight('#fff')
	scene.add(light)

	let geometry = new THREE.PlaneGeometry(300, 300, 50, 50)
	let material = new THREE.MeshBasicMaterial({color: 'green', wireframe: true})

	let mesh = new THREE.Mesh(geometry, material)
	scene.add(mesh)

	renderer.render(scene, camera)

};
