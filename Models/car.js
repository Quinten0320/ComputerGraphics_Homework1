import * as THREE from 'three';
import {GLTFLoader} from "https://cdn.rawgit.com/mrdoob/three.js/master/examples/jsm/loaders/GLTFLoader.js";

export function createCar({ x = 0, y = 0, z = 0 } = {}) {
    const carGroup = new THREE.Group();
    const loader = new GLTFLoader();
    
    loader.load('./Models/Imported/classic_muscle_car.glb', function (gltf) {
        const carModel = gltf.scene;

        carModel.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
        });

        carModel.scale.set(0.1, 0.1, 0.1);
        carModel.position.set(0, 0, 0);

        carModel.rotation.y = Math.PI / 1.5;

        carGroup.castShadow = true;
        carGroup.receiveShadow = true;
        carGroup.add(carModel);
    }, undefined, function (error) {
        console.error(error);
    }
    );

    carGroup.position.set(x, y, z);
    
    function carAnimation(time) {
        let t = time / 500;
        let angle = t * 1;
        carGroup.position.x = 13 + Math.cos(angle) * 1.3;
        carGroup.position.z = 1 - Math.sin(angle) * 1.3;
        carGroup.rotation.y = angle + Math.PI / 2;
    }
    
    return { carGroup, update: carAnimation };
}

