import * as THREE from 'three';

export function createSun({ x = 0, y = 0, z = 0 } = {}) {

    const sunGroup = new THREE.Group();

    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(x, y, z);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;

    light.shadow.camera.left = -50;
    light.shadow.camera.right = 50;
    light.shadow.camera.top = 50;
    light.shadow.camera.bottom = -50;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 2000;

    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    light.shadow.normalBias = 0.1;

    
    sunGroup.add(light);

    sunGroup.position.set(x, y, z);

    return sunGroup;
}

export function createAmbientLight(intensity = 0.5) {
    const ambientLight = new THREE.AmbientLight(0xffffff, intensity);
    return ambientLight;
}