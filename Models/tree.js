import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.171.0/examples/jsm/loaders/GLTFLoader.js';

export function createTree({ x = 0, y = 0, z = 0 } = {}) {
    const treeGroup = new THREE.Group();
    const loader = new GLTFLoader();

    loader.load(
        './Models/Imported/tree.glb',
        function (gltf) {

            const treeModel = gltf.scene;

            treeModel.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            treeModel.scale.set(0.5, 0.5, 0.5); // mss nog kleiner ofz?
            treeModel.position.set(0, 0, 0);

            treeGroup.add(treeModel);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );

    treeGroup.position.set(x, y, z);

    return treeGroup;
}