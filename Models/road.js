import * as THREE from 'three';

export function createRoad(color = 0x00ff00) {
    const geometry = new THREE.BoxGeometry(15, 0.1, 2);
    geometry.translate(7.5, 0, 0);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const cube = new THREE.Mesh(geometry, material);
    return cube;
}