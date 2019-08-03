const THREE = require('three');
//场景
var scene = new THREE.Scene();
//相机
//PerspectiveCamera 透视摄影机
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//渲染器
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();