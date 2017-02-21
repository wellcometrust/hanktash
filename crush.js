var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
camera.position.z = 10;

document.body.appendChild( renderer.domElement );

function render() {
  requestAnimationFrame( render );
  renderer.render(scene, camera);
}
render();
function addBlock(width, height, depth, y) {
  var geometry = new THREE.BoxGeometry( width, height, depth );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );
  cube.position.y = y;
  scene.add( cube );
}
