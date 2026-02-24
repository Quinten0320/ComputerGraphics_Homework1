import * as THREE from 'three';

export function createHouse() {
    const loader = new THREE.TextureLoader();
    
    const brickTexture = loader.load('./Textures/brick.jpg');
    brickTexture.wrapS = THREE.RepeatWrapping;
    brickTexture.wrapT = THREE.RepeatWrapping;
    brickTexture.repeat.set(1, 1);

    const yellowBrickTexture = loader.load('./Textures/Yellow-Brick.jpg');
    yellowBrickTexture.wrapS = THREE.RepeatWrapping;
    yellowBrickTexture.wrapT = THREE.RepeatWrapping;
    yellowBrickTexture.repeat.set(2, 1);

    const bottom = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.MeshBasicMaterial({ map: brickTexture })
    );

    const top = new THREE.Mesh(
        new THREE.BoxGeometry(2, 1, 2),
        new THREE.MeshBasicMaterial({ map: yellowBrickTexture })
    );
    top.position.y = 1.5;

    const group = new THREE.Group();
    group.add(bottom);
    group.add(top);

    return group;
}