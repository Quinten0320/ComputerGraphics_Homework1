import * as THREE from 'three';

export function createSkybox(scene) {
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './Skybox/skyrender0001.jpg',  // rechts
        './Skybox/skyrender0004.jpg',  // links
        './Skybox/skyrender0003.jpg',  // boven
        './Skybox/skyrender0006.jpg',  // onder
        './Skybox/skyrender0005.jpg',  // voor
        './Skybox/skyrender0002.jpg',  // achter
    ]);
    scene.background = texture;
}