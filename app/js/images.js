const diredtory = "/app/imgs/";

function createImage(src) {
	let image = new Image();
	image.src = diredtory + src;
	return image;
}


export const images = {
	c: createImage('blackhole-blue.png')
};
