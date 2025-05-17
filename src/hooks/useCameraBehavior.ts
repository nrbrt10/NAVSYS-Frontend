import { CameraBehavior } from "../types/types";
import * as THREE from 'three';

export function lerpToTarget(speed = 0.05, radius = 20): CameraBehavior {
    return ({ camera, target }) => {
        camera.position.lerp(target, speed);
        return camera.position.distanceTo(target) > radius;
    }
}

export function followTarget(prev: THREE.Vector3): CameraBehavior {
    return ({ camera, controls, target }) => {
        const delta = target.clone().sub(prev);
        camera.position.add(delta);
        controls?.target.add(delta);
        prev.copy(target);
        return true;
    }
}