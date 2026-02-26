import * as THREE from 'three';

export function createSurface() {
    const surface = new THREE.Group();

    const grass = createGrass(0x228B22, { x: 0, y: -1.1, z: 0 });
    const road = createRoad(0x5c5c5c, { x: 0, y: -1, z: 0 });
    const road2 = createRoad(0x5c5c5c, { x: 14, y: -1, z: 0 });
    const circle = createCircle(0x5c5c5c, { x: 13, y: -1, z: 1 });
    road2.rotation.y = Math.PI / 2; 

    const driveway = createDriveway(0xA0896B, 12, { x: 0, y: -1, z: -2 });
    const driveway2 = createDriveway(0xA0896B, 16, { x: 16, y: -1, z: 1 });
    driveway2.rotation.y = Math.PI / 2; 

    surface.add(grass, road, road2, circle, driveway, driveway2);

    return surface;
}

function createRoad(color = 0x00ff00, { x = 0, y = 0, z = 0 } = {}) {
    const geometry = new THREE.BoxGeometry(15, 0.1, 2);
    geometry.translate(7.5, 0, 0);

    const material = new THREE.MeshBasicMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    return mesh;
}

function createCircle(color = 0x00ff00, { x = 0, y = 0, z = 0 } = {}) {
    const geometry = new THREE.CylinderGeometry(2, 1, 0.1, 32);

    const material = new THREE.MeshBasicMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    return mesh;
}

function createGrass(color = 0x228B22, { x = 0, y = 0, z = 0 } = {}) {
    const geometry = new THREE.BoxGeometry(30, 0.1, 30);
    geometry.translate(8, 0, 0);

    const material = new THREE.MeshBasicMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    return mesh;
}

function createDriveway(color = 0xA0896B, length, { x = 0, y = 0, z = 0 } = {}) {
    const geometry = new THREE.BoxGeometry(length, 0.1, 2);
    geometry.translate(length / 2, 0, 0);

    const material = new THREE.MeshBasicMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    return mesh;
}