import './../sass/main.sass';
import {ctx, canvas} from './init';
import {fps, nextGameStep } from './functions';
import {Camera} from './camera';
import { Troops } from './Troops';


// Creating images just per page loading
window.addEventListener("load", gameLoop())


// Main project function. 60 times per second drawing and changing everything
// Objects are drawing depending on calling in this function. If we need to draw some object on the top layer - we need to call it earlier
function gameLoop() {
	
	ctx.clearRect(0 , 0, canvas.width, canvas.height);

	Camera.move()

	ctx.save();
	ctx.translate(-Camera.x, -Camera.y);

	Troops.draw()

	ctx.restore();


	fps();


	// Next frame
	nextGameStep(gameLoop);
	
};
