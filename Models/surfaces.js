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
    surface.receiveShadow = true;

    return surface;
}

function createRoad(color = 0x00ff00, { x = 0, y = 0, z = 0 } = {}) {
    const geometry = new THREE.BoxGeometry(15, 0.1, 2);
    const loader = new THREE.TextureLoader();
    geometry.translate(7.5, 0, 0);

    const roadTexture = loader.load('./Textures/Asphalt.jpg');
        roadTexture.wrapS = THREE.RepeatWrapping;
        roadTexture.wrapT = THREE.RepeatWrapping;
        roadTexture.repeat.set(50, 5);

    const material = new THREE.MeshStandardMaterial({ 
        color: color,
        map: roadTexture
    });  
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    mesh.receiveShadow = true;
    mesh.castShadow = false;
    return mesh;
}

function createCircle(color = 0x00ff00, { x = 0, y = 0, z = 0 } = {}) {
    const geometry = new THREE.CylinderGeometry(2, 1, 0.1, 32);
    const loader = new THREE.TextureLoader();

    const roadTexture = loader.load('./Textures/Asphalt.jpg');
        roadTexture.wrapS = THREE.RepeatWrapping;
        roadTexture.wrapT = THREE.RepeatWrapping;
        roadTexture.repeat.set(50, 5);
    const material = new THREE.MeshStandardMaterial({ 
        color: color,
        map: roadTexture
    });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    mesh.position.y += 0.001;
    mesh.receiveShadow = true;
    mesh.castShadow = false;        
    return mesh;
}

function createGrass(color = 0x228B22, { x = 0, y = 0, z = 0 } = {}) {
    const geometry = new THREE.BoxGeometry(30, 0.1, 30);
    const loader = new THREE.TextureLoader();
    geometry.translate(8, 0, 0);

    const grassTexture = loader.load('./Textures/grass.jpg');
        grassTexture.wrapS = THREE.RepeatWrapping;
        grassTexture.wrapT = THREE.RepeatWrapping;
        grassTexture.repeat.set(50, 50);

    const material = new THREE.MeshStandardMaterial({ 
        color: color,
        map: grassTexture
    });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    mesh.receiveShadow = true;
    mesh.castShadow = false;
    return mesh;
}

function createDriveway(color = 0xA0896B, length, { x = 0, y = 0, z = 0 } = {}) {
    const geometry = new THREE.BoxGeometry(length, 0.1, 2);
    const loader = new THREE.TextureLoader();
    const drivewayTexture = loader.load('./Textures/FloorBricks.jpg');
        drivewayTexture.wrapS = THREE.RepeatWrapping;
        drivewayTexture.wrapT = THREE.RepeatWrapping;
        drivewayTexture.repeat.set(5, 1);

    geometry.translate(length / 2, 0, 0);

    const material = new THREE.MeshStandardMaterial({ 
        color: color,
        map: drivewayTexture
    });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    mesh.receiveShadow = true;
    mesh.castShadow = false;
    return mesh;
}