import * as THREE from 'three';


// public functions
export function createHouse() {
    const group = new THREE.Group();
    group.add(createBottomHouse());
    group.add(createTopHouse());
    group.add(createRoof());
    group.add(createDoor());
    return group;
}


// private functions
function createBottomHouse() {
    const loader = new THREE.TextureLoader();
    const brickTexture = loader.load('./Textures/brick.jpg');
    brickTexture.wrapS = THREE.RepeatWrapping;
    brickTexture.wrapT = THREE.RepeatWrapping;
    brickTexture.repeat.set(1, 1);

    return new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.MeshBasicMaterial({ map: brickTexture })
    );
}

function createTopHouse() {
    const loader = new THREE.TextureLoader();
    const yellowBrickTexture = loader.load('./Textures/Yellow-Brick.jpg');
    yellowBrickTexture.wrapS = THREE.RepeatWrapping;
    yellowBrickTexture.wrapT = THREE.RepeatWrapping;
    yellowBrickTexture.repeat.set(2, 1);

    const top = new THREE.Mesh(
        new THREE.BoxGeometry(2, 1, 2),
        new THREE.MeshBasicMaterial({ map: yellowBrickTexture })
    );
    top.position.y = 1.5;
    return top;
}

function createRoof() {
    const loader = new THREE.TextureLoader();
    const roofTexture = loader.load('./Textures/Dakpaneel.jpg');
    roofTexture.wrapS = THREE.RepeatWrapping;
    roofTexture.wrapT = THREE.RepeatWrapping;
    roofTexture.repeat.set(2, 1);

    // Prism for roof
    const shape = new THREE.Shape();
    shape.moveTo(-1, 0);     
    shape.lineTo(1, 0);      
    shape.lineTo(0, 0.8);      
    shape.lineTo(-1, 0);     

    const extrudeSettings = {
        depth: 2,     // length of roof/house
        bevelEnabled: false
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshBasicMaterial({ map: roofTexture });

    const roof = new THREE.Mesh(geometry, material);

    roof.rotation.y = Math.PI / 2;
    roof.position.z = 0;
    roof.position.x = -1;
    roof.position.y = 2.01;

    return roof;
}

function createDoor() {
    const geometry = new THREE.BoxGeometry(0.5, 1, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0x654321 });
    const door = new THREE.Mesh(geometry, material);
    door.position.y = -0.5;
    door.position.z = 1.05;
    door.position.x = -0.25;
    return door;
}

//todo: 3 ramen, ding boven deur, schoorsteen op dak, als het kan mss elke 2 huizen aan de rechterkant een regenpijp