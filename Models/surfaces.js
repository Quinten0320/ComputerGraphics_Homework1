import * as THREE from 'three';

export function createRoad(color = 0x00ff00) {
    const geometry = new THREE.BoxGeometry(15, 0.1, 2);
    geometry.translate(7.5, 0, 0);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

export function createUnderground(color = 0x228B22) {
    const geometry = new THREE.BoxGeometry(20, 0.1, 25);
    geometry.translate(7.5, -1.1, 0);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

export function createDriveway(color = 0xA0896B) {
    const geometry = new THREE.BoxGeometry(12, 0.1, 2);
    geometry.translate(6, -1, -2);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}