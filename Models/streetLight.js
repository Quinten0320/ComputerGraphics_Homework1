import * as THREE from 'three';

export function createStreetLight({ x = 0, y = 0, z = 0 } = {}) {
    const group = new THREE.Group();
    const pole = new THREE.CylinderGeometry(0.05, 0.05, 3, 8);
    const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x878787 });
    const poleMesh = new THREE.Mesh(pole, poleMaterial);

    const cone = new THREE.ConeGeometry(0.4, 0.2, 16);
    const coneMaterial = new THREE.MeshStandardMaterial({ color: 0x878787});
    const coneMesh = new THREE.Mesh(cone, coneMaterial);
    coneMesh.position.y = 1.4;

    const cone2 = new THREE.ConeGeometry(0.3, 0.1, 16);
    const coneMaterial2 = new THREE.MeshStandardMaterial({
        color: 0xffffaa,
        emissive: 0xffff88,
        emissiveIntensity: 2
    });
    
    const coneMesh2 = new THREE.Mesh(cone2, coneMaterial2);
    coneMesh2.rotation.x = Math.PI;
    coneMesh2.position.y = 1.25;

    group.add(coneMesh, coneMesh2, poleMesh);

    group.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    group.position.set(x, y, z);

    return group;
}   