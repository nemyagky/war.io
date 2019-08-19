export const canvas = document.querySelector(".canvas");
export const ctx = canvas.getContext('2d');


function stretchCanvas() {
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
};
stretchCanvas();


window.addEventListener('resize', () => {
	stretchCanvas();
});

export let iterations = 0;
