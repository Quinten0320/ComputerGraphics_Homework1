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
        carModel.position.set(x, y, z);

        carGroup.castShadow = true;
        carGroup.receiveShadow = true;
        carGroup.add(carModel);
    }, undefined, function (error) {
        console.error(error);
    }
    );
    return carGroup;
}
