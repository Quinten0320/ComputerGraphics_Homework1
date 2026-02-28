import * as THREE from 'three';

// public functions
export function createHouse({ showRainPipe = false } = {}) {
    const group = new THREE.Group();
    group.add(createBottomHouse());
    group.add(createTopHouse());
    group.add(createRoof());
    group.add(createDoor());
    group.add(createCanopy());
    group.add(...createWindows());
    group.add(...createChimneys());
    if (showRainPipe) group.add(createRainPipe());
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
        new THREE.MeshStandardMaterial({ map: brickTexture })
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
        new THREE.MeshStandardMaterial({ map: yellowBrickTexture })
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

    const shape = new THREE.Shape();
    shape.moveTo(-1, 0);
    shape.lineTo(1, 0);
    shape.lineTo(0, 0.8);
    shape.lineTo(-1, 0);

    const extrudeSettings = { depth: 2, bevelEnabled: false };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshStandardMaterial({ map: roofTexture });

    const roof = new THREE.Mesh(geometry, material);
    roof.rotation.y = Math.PI / 2;
    roof.position.set(-1, 2.01, 0);
    return roof;
}

function createDoor() {
    const geometry = new THREE.BoxGeometry(0.5, 1, 0.1);
    const material = new THREE.MeshStandardMaterial({ color: 0x2b2b2b });
    const door = new THREE.Mesh(geometry, material);
    door.position.set(-0.25, -0.5, 1.05);
    return door;
}

// ding boven deur
function createCanopy() {
    const roof = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.05, 0.35),
        new THREE.MeshStandardMaterial({ color: 0x888888 })
    );
    roof.position.set(-0.25, 0.1, 1.2)

    return roof;
}

function createWindows() {
    const frameMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0xadd8e6, transparent: true, opacity: 0.6 });

    function makeWindow(w, h, x, y, z) {
        const group = new THREE.Group();

        // frame om glas heen.
        const frame = new THREE.Mesh(
            new THREE.BoxGeometry(w + 0.06, h + 0.06, 0.05),
            frameMat
        );
        group.add(frame);

        const glass = new THREE.Mesh(
            new THREE.BoxGeometry(w, h, 0.06),
            glassMat
        );
        group.add(glass);

        group.position.set(x, y, z);
        return group;
    }

    return [
        // grond
        makeWindow(0.8, 0.7, 0.55, -0.3, 1.06),

        // 1e verdieping links
        makeWindow(0.22, 0.55, -0.6, 1.5, 1.06),

        //1e verdieping rechts
        makeWindow(0.75, 0.55, 0.45, 1.5, 1.06),
    ];
}

// twee schoorstenen op het dak
function createChimneys() {
    const mat = new THREE.MeshStandardMaterial({ color: 0x5a3e36 });
    const capMat = new THREE.MeshStandardMaterial({ color: 0x333333 });

    function makeChimney(x, z) {
        const group = new THREE.Group();

        const body = new THREE.Mesh(
            new THREE.BoxGeometry(0.12, 0.4, 0.12),
            mat
        );
        group.add(body);

        // cap op schoosten
        const cap = new THREE.Mesh(
            new THREE.BoxGeometry(0.16, 0.04, 0.16),
            capMat
        );
        cap.position.y = 0.22;
        group.add(cap);

        group.position.set(x, 2.85, z);
        return group;
    }

    return [
        makeChimney(-0.3, -0.2),
        makeChimney( 0.3, -0.2),
    ];
}

function createRainPipe() {
    const mat = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const pipe = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 3, 8),
        mat
    );
    pipe.position.set(1.1, 0.5, 1.05);

    return pipe;
}