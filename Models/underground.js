import * as THREE from 'three';

export function createUnderground(color = 0x228B22) {
    const geometry = new THREE.BoxGeometry(15, 0.1, 10);
    geometry.translate(7.5, -1.1, 0);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}