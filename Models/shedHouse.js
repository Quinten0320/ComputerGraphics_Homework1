import * as THREE from 'three';

export function createShedHouse({ x = 0, y = 0, z = 0 } = {}) {
    const house = new THREE.Group();

    const groundFloor = createGroundFloor();
    const firstFloor = createFirstFloor();
    const roof = createRoof();
    const shed = createShed(0x654321, { x: -3, y: -0.5, z: 2 });

    house.add(groundFloor, firstFloor, roof, shed);
    house.position.set(x, y, z);

    house.traverse((obj) => {
    if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
    }
    });

    return house;
}

function createShed(color = 0x654321, { x = 0, y = 0, z = 0 } = {}) {
    const shedGroup = new THREE.Group();
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.BoxGeometry(2, 1.1, 0.75);

    const shedTexture = loader.load('./Textures/Brick2.jpg');
    shedTexture.wrapS = THREE.RepeatWrapping;
    shedTexture.wrapT = THREE.RepeatWrapping;
    shedTexture.repeat.set(1, 1);

    const material = new THREE.MeshStandardMaterial({ map: shedTexture });
    const mesh = new THREE.Mesh(geometry, material);
    
    const door = createDoor('./Textures/ShedDoor.jpg', 0x654321, { x: -3, y: -0.5, z: 1.6 });
    const door2 = createDoor('./Textures/ShedDoor.jpg', 0x654321, { x: -3, y: -0.5, z: 2.40 });
    door.rotation.y = Math.PI;
    door2.rotation.y = Math.PI;

    shedGroup.add(mesh, door, door2);
    mesh.position.set(x, y, z);
    return shedGroup;
}

function createWindow(color = 0x87CEEB, { sizeX = 0, sizeY = 0} = {},  { x = 0, y = 0, z = 0 } = {}) {
    const geometry = new THREE.BoxGeometry(sizeX, sizeY, 0.05);
    const material = new THREE.MeshStandardMaterial({
        color: 0x87CEEB,  
        metalness: 0.8,   
        roughness: 0.1,  
        opacity: 0.8
    });
    const mesh = new THREE.Mesh(geometry, material);

    geometry.center();
    mesh.position.set(x, y, z);
    mesh.rotation.y = Math.PI / 2;
    return mesh;
}

function  createDoor(texturePath ,color = 0x654321, { x = 0, y = 0, z = 0 } = {}) {
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.BoxGeometry(0.5, 1, 0.05);

    const doorTexture = loader.load(texturePath);
    doorTexture.wrapS = THREE.RepeatWrapping;
    doorTexture.wrapT = THREE.RepeatWrapping;
    doorTexture.repeat.set(1, 1);
    
    const material = new THREE.MeshStandardMaterial({ map: doorTexture });
    const mesh = new THREE.Mesh(geometry, material);

    geometry.center();
    mesh.position.set(x, y, z);
    mesh.rotation.y = Math.PI / 2;
    return mesh;
}

function createRoof(color = 0x8B0000, { x = 0, y = 0, z = 0 } = {}) {
    const loader = new THREE.TextureLoader();
    const roofShape = new THREE.Shape();
    roofShape.moveTo(-2, 0);
    roofShape.lineTo(0, 1);
    roofShape.lineTo(2, 0);
    roofShape.lineTo(2, 0.1);
    roofShape.lineTo(0, 1.1);
    roofShape.lineTo(-2, 0.1);
    roofShape.lineTo(-2, 0);

    const geometry = new THREE.ExtrudeGeometry(roofShape, {
        depth: 4.1,
        bevelEnabled: false
    });

    const roofTexture = loader.load('./Textures/RoofTile.jpg');
    roofTexture.wrapS = THREE.RepeatWrapping;
    roofTexture.wrapT = THREE.RepeatWrapping;
    roofTexture.rotation = Math.PI / 2;  
    roofTexture.repeat.set(1, 1);

    const material = new THREE.MeshStandardMaterial({ map: roofTexture });
    const mesh = new THREE.Mesh(geometry, material);

    geometry.center();
    mesh.rotation.y = Math.PI / 2;
    mesh.position.set(x, y + 1.7, z);
    return mesh;
}

function createFirstFloor({ x = 0, y = 0, z = 0 } = {}) {
    const firstFloor = new THREE.Group();
    const loader = new THREE.TextureLoader();
    const floorShape = new THREE.Shape();
    floorShape.moveTo(-2, 0);
    floorShape.lineTo(2, 0);
    floorShape.lineTo(2, 0.2);
    floorShape.lineTo(0, 1.2);
    floorShape.lineTo(-2, 0.2);
    floorShape.lineTo(-2, 0);

    const geometry = new THREE.ExtrudeGeometry(floorShape, {
        depth: 4,
        bevelEnabled: false
    });

    const floorTexture = loader.load('./Textures/White-Brick.jpg');
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(0.5, 0.5);

    const material = new THREE.MeshStandardMaterial({ map: floorTexture });
    const mesh = new THREE.Mesh(geometry, material);

    const window1 = createWindow(0x87CEEB, { sizeX: 0.2, sizeY: 0.6 }, { x: -2, y: 1.3, z: 0.2 });
    const window2 = createWindow(0x87CEEB, { sizeX: 0.2, sizeY: 0.6 }, { x: -2, y: 1.3, z: -0.2 });

    geometry.center();
    mesh.rotation.y = Math.PI / 2;
    mesh.position.set(x, y + 1.6, z);
    firstFloor.add(mesh, window1, window2);
    return firstFloor;
}

function createGroundFloor({ x = 0, y = 0, z = 0 } = {}) {
    const groundFloor = new THREE.Group();
    const loader = new THREE.TextureLoader();
    const brickTexture = loader.load('./Textures/Brick2.jpg');
    brickTexture.wrapS = THREE.RepeatWrapping;
    brickTexture.wrapT = THREE.RepeatWrapping;
    brickTexture.repeat.set(2, 2);

    const door1 = createDoor('./Textures/Door.jpg', 0x654321, { x: -2, y: -0.5, z: 1.2 });
    const door2 = createDoor('./Textures/Door.jpg', 0x654321, { x: -2, y: -0.5, z: -1.2 });

    const bigWindow1 = createWindow(0x87CEEB, { sizeX: 0.6, sizeY: 1.5 }, { x: -2, y: 0.1, z: 0.4 });
    const bigWindow2 = createWindow(0x87CEEB, { sizeX: 0.6, sizeY: 1.5 }, { x: -2, y: 0.1, z: -0.4 });
    
    const smallWindow1 = createWindow(0x87CEEB, { sizeX: 0.6, sizeY: 0.15 }, { x: -2, y: 0.6, z: 1.25 });
    const smallWindow2 = createWindow(0x87CEEB, { sizeX: 0.6, sizeY: 0.15 }, { x: -2, y: 0.6, z: -1.25 });

    const geometry = new THREE.BoxGeometry(4, 2, 4);
    const material = new THREE.MeshStandardMaterial({ map: brickTexture });
    const mesh = new THREE.Mesh(geometry, material);
    
    const drain = new THREE.CylinderGeometry(0.05, 0.05, 3.5, 32, 1, true)
    const drainMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF,
        side: THREE.DoubleSide
    });
    const drainMesh = new THREE.Mesh(drain, drainMaterial);

    drainMesh.position.set(-2.05, -0.5, 2);

    groundFloor.add(mesh, door1, door2, bigWindow1, bigWindow2, smallWindow1, smallWindow2, drainMesh);
    return groundFloor;
}