import * as THREE from 'three';

export function createRoad(color = 0x00ff00, { x = 0, y = 0, z = 0 } = {}) {
    const geometry = new THREE.BoxGeometry(15, 0.1, 2);
    geometry.translate(7.5, 0, 0);

    const material = new THREE.MeshBasicMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    return mesh;
}

export function createCircle(color = 0x00ff00, { x = 0, y = 0, z = 0 } = {}) {
    const geometry = new THREE.CylinderGeometry(2, 1, 0.1, 32);

    const material = new THREE.MeshBasicMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    return mesh;
}

export function createGrass(color = 0x228B22, { x = 0, y = 0, z = 0 } = {}) {
    const geometry = new THREE.BoxGeometry(30, 0.1, 30);
    geometry.translate(8, 0, 0);

    const material = new THREE.MeshBasicMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    return mesh;
}

export function createDriveway(color = 0xA0896B, { x = 0, y = 0, z = 0 } = {}) {
    const geometry = new THREE.BoxGeometry(12, 0.1, 2);
    geometry.translate(6, 0, 0);

    const material = new THREE.MeshBasicMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    return mesh;
}

export function createSurface() {
    const surface = new THREE.Group();

    const grass = createGrass(0x228B22, { x: 0, y: -1.1, z: 0 });
    const road = createRoad(0x5c5c5c, { x: 0, y: -1, z: 0 });
    const road2 = createRoad(0x5c5c5c, { x: 14, y: -1, z: 0 });
    const circle = createCircle(0x5c5c5c, { x: 13, y: -1, z: 1 });
    road2.rotation.y = Math.PI / 2; 

    const driveway = createDriveway(0xA0896B, { x: 0, y: -1, z: -2 });

    surface.add(grass, road, road2, circle, driveway);

    return surface;
}