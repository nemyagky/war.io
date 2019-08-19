import {ctx, canvas} from './init';


const miniMapSettings = {
	maxW: 400,
	minW: 250,
	heightCoef: 1.8
};

export const MiniMap = new class MiniMap {
	
	constructor() {
		this.maxW = miniMapSettings.maxW;
		this.minW = miniMapSettings.minW;
		this.heightCoef = miniMapSettings.heightCoef;
		this.color = "#FFFFFF";

		this.setSize( window.innerWidth );

		window.addEventListener('resize', () => {
			this.setSize( window.innerWidth );
		})
	};


	draw() {
		this.drawBorder();
	};


	// During resizing the screen
	setSize(width) {
		width = width/3.85;

		if (width > this.maxW)
			this.width = this.maxW;
		else if (width < this.minW) 
			this.width = this.minW;
		else 
			this.width = width;

		this.height = this.width/this.heightCoef;
	};


	// Draw minimap border
	drawBorder() {
		ctx.beginPath();
		ctx.strokeStyle = "#fff";
		ctx.rect(1, (canvas.height - this.height - 2), this.width + 5, this.height);
		ctx.stroke();
		ctx.closePath();
	};

};
