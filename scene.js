import * as THREE from 'three';
import { createSkybox } from './Skybox/skybox.js';
import { createSurface } from './Models/surfaces.js';

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

//surface
const surface = createSurface();
scene.add(surface);

camera.position.set(0, 0, 0);

function animate( time ) {
  controls.update();  //Orbitcontrols

  //TODO: animate car, mss kunnen we deze ook importeren ofz.

  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );