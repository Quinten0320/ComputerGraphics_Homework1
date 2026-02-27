import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.171.0/examples/jsm/controls/OrbitControls.js';

const MOVE_SPEED = 0.08;
const MIN_Y = 0.5;

const keys = {};

export function createCamera(renderer) {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 2;
    controls.maxDistance = 50;
    controls.target.set(0, 1, 0);
    controls.update();

    // keyboard input
    window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
    window.addEventListener('keyup',   e => keys[e.key.toLowerCase()] = false);

    // fix so window resizes automatically.
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return { camera, controls };
}

export function updateCamera(camera, controls) {
    //only use forward and right vector for movement, use -movespeed for other way 
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(forward, camera.up).normalize();

    const move = new THREE.Vector3();

    if (keys['w']) move.addScaledVector(forward,  MOVE_SPEED);
    if (keys['s']) move.addScaledVector(forward, -MOVE_SPEED);
    if (keys['a']) move.addScaledVector(right,   -MOVE_SPEED);
    if (keys['d']) move.addScaledVector(right,    MOVE_SPEED);
    if (keys['e']) move.y += MOVE_SPEED;
    if (keys['q']) move.y -= MOVE_SPEED;

    // so that orbitcontrols doesnt snap back when moving with wasdqe
    camera.position.add(move);
    controls.target.add(move);

    //vloor hitbox
    if (camera.position.y < MIN_Y) {
        const diff = MIN_Y - camera.position.y;
        camera.position.y = MIN_Y;
        controls.target.y += diff;
    }

    controls.update();
}