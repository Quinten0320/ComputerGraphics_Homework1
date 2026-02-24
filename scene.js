import * as THREE from 'three';
import { createSkybox } from './Skybox/skybox.js';
import { createRoad, createUnderground, createDriveway } from './Models/surfaces.js';

import { OrbitControls } from 'https://unpkg.com/three@0.171.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//skybox
createSkybox(scene);

const renderer = new THREE.WebGLRenderer();

//Orbitcontrols
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0.1, 0, 0);
controls.update();

renderer.setSize( window.innerWidth, window.innerHeight ); //set size of renderer to size of window
document.body.appendChild( renderer.domElement );

//road
const road = createRoad(0x5c5c5c);
scene.add(road);
road.position.y = -1;

//green underground (grass)
const underground = createUnderground(0x228B22);
scene.add(underground);

//driveway
const driveway = createDriveway();
scene.add(driveway);

camera.position.set(0, 0, 0);

function animate( time ) {
  controls.update();  //Orbitcontrols

  //TODO: animate car, mss kunnen we deze ook importeren ofz.

  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );