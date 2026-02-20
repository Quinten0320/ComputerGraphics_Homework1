import * as THREE from 'three';
import { createCube } from './Models/cube.js';
import { createSkybox } from './Skybox/skybox.js';

//idk of dit mag van de opdracht, maar is voor nu even handig ofz. Navragen bij Ward
import { OrbitControls } from 'https://unpkg.com/three@0.171.0/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//skybox
createSkybox(scene);

const renderer = new THREE.WebGLRenderer();

//Orbitcontrols
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

renderer.setSize( window.innerWidth, window.innerHeight ); //set size of renderer to size of window
document.body.appendChild( renderer.domElement );

const cube1 = createCube(0x00ff00); // groene cube
cube1.position.set(0, 0, 0);
scene.add(cube1);

const cube2 = createCube(0xff0000); // rode cube
cube2.position.set(3, 0, 0);
scene.add(cube2);

camera.position.z = 5;

function animate( time ) {
    cube1.rotation.x = time / 2000;
    cube1.rotation.y = time / 1000;
    cube2.rotation.x = time / 2000;
    cube2.rotation.y = time / 1000;

  controls.update();  //Orbitcontrols

  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );