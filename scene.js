import * as THREE from 'three';
import { createSkybox } from './Skybox/skybox.js';
import { createHouse } from './Models/house.js';
import { createSurface } from './Models/surfaces.js';
import { createGarageHouse } from './Models/garageHouse.js';
import { createCar } from './Models/car.js';
import { createSun } from './Skybox/light.js';
import { createAmbientLight } from './Skybox/light.js';
import { createCamera, updateCamera } from './Skybox/camera.js';

      
const scene = new THREE.Scene();

//skybox
createSkybox(scene);

const renderer = new THREE.WebGLRenderer();
const { camera, controls } = createCamera(renderer);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize( window.innerWidth, window.innerHeight ); //set size of renderer to size of window (might be redundant?)
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
const { carGroup, update: carAnimation } = createCar({ x: 13, y: -0.8, z: 1 });
scene.add(carGroup);

//light
const sun = createSun({ x: -60, y: 40, z: -60 });
const ambientLight = createAmbientLight(0.3);
scene.add(sun, ambientLight);

// Create 6 houses
for (let i = 0; i < 6; i++) {
    const house = createHouse({ showRainPipe: i % 2 === 1 }); //elke 2 huizen regenpjip
    house.position.set(1 + i * 2, 0, -4);
    scene.add(house);
}

function animate( time ) {
  updateCamera(camera, controls);

  carAnimation(time);

  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
