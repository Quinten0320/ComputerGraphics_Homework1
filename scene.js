import * as THREE from 'three';
import { createSkybox } from './Skybox/skybox.js';
import { createSurface } from './Models/surfaces.js';
import { createGarageHouse } from './Models/garageHouse.js';
import { createCar } from './Models/car.js';
import { createSun } from './Skybox/light.js';
import { createAmbientLight } from './Skybox/light.js';

import { OrbitControls } from 'https://unpkg.com/three@0.171.0/examples/jsm/controls/OrbitControls.js';
      
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//skybox
createSkybox(scene);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//Orbitcontrols
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0.1, 0, 0);
controls.update();

renderer.setSize( window.innerWidth, window.innerHeight ); //set size of renderer to size of window
document.body.appendChild( renderer.domElement );

//surface
const surface = createSurface();
scene.add(surface);

//garage house
for (let i = 0; i < 4; i++) {
    const garageHouse = createGarageHouse({ x: 19, y: 0, z: -1 - i * 4 });
    scene.add(garageHouse);
}

//car
const car = createCar({ x: 5, y: -0.8, z: 0 });
scene.add(car);

//light
const sun = createSun({ x: -60, y: 40, z: -60 });
const ambientLight = createAmbientLight(0.3);
scene.add(sun, ambientLight);

camera.position.set(0, 0, 0);

function animate( time ) {
  controls.update();  //Orbitcontrols

  //TODO: animate car, mss kunnen we deze ook importeren ofz.

  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );