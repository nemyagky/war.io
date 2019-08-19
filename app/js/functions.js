import { ctx, iterations } from "./init";

// Next frame
export let nextGameStep = (function () {
  return requestAnimationFrame ||
    mozRequestAnimationFrame ||
    webkitRequestAnimationFrame ||
    oRequestAnimationFrame ||
    msRequestAnimationFrame ||
    function (callback) {
      setTimeout(callback, 1000 / 60);
    }
})();


// FPS in the top left corner
export function fps() {
  setColor("#fff");
  ctx.font = "20pt Arial";
  ctx.fillText("Итераций: " + iterations, 10, 130);
  ctx.fillText("FPS: " + countFPS(), 10, 80);
};

let countFPS = function () {
  var lastLoop = (new Date()).getMilliseconds();
  var count = 1;
  var fps = 0;

  return function () {
    var currentLoop = (new Date()).getMilliseconds();
    if (lastLoop > currentLoop) {
      fps = count;
      count = 1;
    } else {
      count += 1;
    }
    lastLoop = currentLoop;
    return fps;
  };
}();



export function rand(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};



// a - angle in degrees
export function toRad(a) {
  return a * Math.PI / 180;
};


export function Round10(val) {
  return Math.round(val / 10) * 10;
}


// Rotate an object while rendering to canvas. It takes the center of the object and the angle of rotation
// After calling thia func, we need to draw an object and use ctx.restore()
export function rotate(dx, dy, a) {
  ctx.save();
  ctx.translate(dx, dy);
  ctx.rotate((Math.PI / 180) * a);
  ctx.translate(-dx, -dy);
};



// Used for optimization, because changing ctx color - costly operation (if you are interesting - it takes 30% more time)
let ctxColor = "#FFFFFF";
export function setColor(newColor) {
	if (ctxColor != newColor) {
		ctx.fillStyle = newColor;
    ctxColor = newColor;
	};
};



// Accepts two arrays of the form [x, y]
export function getDistBetween2dots(dot1, dot2) {
  let a = dot1[0] - dot2[0];
  let b = dot1[1] - dot2[1];

  return Math.sqrt(a * a + b * b);
};



// The keyboardPressed object contains active keyboard buttons
export let keyboardPressed = {};

(function setKeyboardSettings() {
  window.onkeydown = function (e) {
    if (e.keyCode == 87) keyboardPressed.w = true;
    if (e.keyCode == 65) keyboardPressed.a = true;
    if (e.keyCode == 68) keyboardPressed.s = true;
    if (e.keyCode == 83) keyboardPressed.d = true;
  };
  window.onkeyup = function (e) {
    if (e.keyCode == 87) keyboardPressed.w = false;
    if (e.keyCode == 65) keyboardPressed.a = false;
    if (e.keyCode == 68) keyboardPressed.s = false;
    if (e.keyCode == 83) keyboardPressed.d = false;
  };
})();



export let cursor = {
  x: 0,
  y: 0,
  isPressed: false
};

(function setCursorSettings() {

  window.addEventListener("mousemove", (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
    cursor.e = e.target;
  });
  window.addEventListener("mousedown", () => {
    cursor.isPressed = true;
  });
  window.addEventListener("mouseup", () => {
    cursor.isPressed = false;
  });
  window.addEventListener("contextmenu", () => {
    return false;
  });

})();

