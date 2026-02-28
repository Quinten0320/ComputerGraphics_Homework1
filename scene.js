import * as THREE from 'three';
import { createSkybox } from './Skybox/skybox.js';
import { createHouse } from './Models/house.js';
import { createSurface } from './Models/surfaces.js';
import { createShedHouse } from './Models/shedHouse.js';
import { createCar } from './Models/car.js';
import { createSun } from './Skybox/light.js';
import { createAmbientLight } from './Skybox/light.js';
import { createCamera, updateCamera } from './Skybox/camera.js';

      
const scene = new THREE.Scene();

// skybox
createSkybox(scene);

const renderer = new THREE.WebGLRenderer();
const { camera, controls } = createCamera(renderer);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize( window.innerWidth, window.innerHeight ); //set size of renderer to size of window (might be redundant?)
document.body.appendChild( renderer.domElement );

// surface
const surface = createSurface();
scene.add(surface);



// car
const { carGroup, update: carAnimation } = createCar({ x: 13, y: -0.8, z: 1 });
scene.add(carGroup);

// light
const sun = createSun({ x: -60, y: 40, z: 60 });
const ambientLight = createAmbientLight(0.3);
scene.add(sun, ambientLight);

// housing
// Create 2 rows of 6 houses
for (let row = 0; row < 2; row++) {
    for (let i = 0; i < 6; i++) {
        const house = createHouse({ showRainPipe: i % 2 === 1 }); //elke 2 huizen regenpjip

        const x = 1 + i * 2;          
        const z = -4 - row * 10;       

        house.position.set(x, 0, z);
        scene.add(house);
    }
}

// 4 shed houses
for (let i = 0; i < 4; i++) {
    const garageHouse = createShedHouse({ x: 19, y: 0, z: -1 - i * 4 });
    scene.add(garageHouse);
}

function animate( time ) {
  updateCamera(camera, controls);

  carAnimation(time);

  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
