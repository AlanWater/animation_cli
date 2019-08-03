import Animation from "./animation";
var Ox = window.outerWidth / 2,
    Oy = window.outerHeight / 2;
var O = document.createElement("div");
O.id = 'circle-o';
O.style.backgroundColor = 'red';
O.style.height = '3px';
O.style.width = '3px';
O.style.position = "absolute";
O.style.left = Ox + 'px';
O.style.top = Oy + 'px';
O.style.zIndex = '9999';
document.body.appendChild(O);
var circle = new Animation.Circle(null, Ox, Oy, 200, 10);
circle.run();