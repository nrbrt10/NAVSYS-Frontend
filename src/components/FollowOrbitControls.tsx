import { useRef, useEffect, useState, RefObject, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls as DreiOrbitControls } from 'three-stdlib';
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three';
import { CameraBehavior, ViewState } from '../types/types';
import { followTarget, lerpToTarget } from '../hooks/useCameraBehavior';

interface FollowOrbitControlsProps {
    targetRef: THREE.Object3D | null,
    viewState: ViewState,
}

export function FollowOrbitControls( {
    targetRef,
    viewState
}: FollowOrbitControlsProps) {
    const defaultTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);
    const target = targetRef?.position ?? defaultTarget;
    const type = targetRef?.userData.type;

    const behaviors = useRef<CameraBehavior[]>([]);
    const controlsRef = useRef<DreiOrbitControls>(null!)
    const prevTargetRef = useRef<THREE.Vector3>(target.clone());
    const { camera, gl } = useThree();
    

    useEffect(() => {
        camera.up.set(0, 0, 1);      
        if (!controlsRef.current) return;
        
        if (viewState.viewMode === 'system') {
            camera.position.set(0, -100, 100);
            controlsRef.current.target.set(0, 0, 0);
            prevTargetRef.current.copy(target);
            behaviors.current = [];
        } else if (type === 'grid') {
            behaviors.current = [
                lerpToTarget(),
                followTarget(prevTargetRef.current)
            ];
        } else if (type === 'dx' || 'poi') {
            controlsRef.current.target.copy(target)
            behaviors.current = [
                lerpToTarget()
            ]
        }
    }, [viewState.viewMode, targetRef])

    useFrame(() => {
        const ctrl = controlsRef.current;
        if (!ctrl) return;

        const ctx = { camera, controls: controlsRef.current!, target };

        behaviors.current = behaviors.current.filter(fn => fn(ctx));
        controlsRef.current!.update()

        

        

        // if (viewState.viewMode === 'zone') {

        //     if (camera.position.distanceTo(target) > 5) {
        //         camera.lookAt(target);
        //         camera.position.lerp(target, 0.01);
        //     }
        //     const delta = new THREE.Vector3().subVectors(
        //         target,
        //         prevTargetRef.current
        //     );

        //     if (delta.lengthSq() > 0) {
        //         camera.position.add(delta);
        //         ctrl.target.add(delta);
        //         prevTargetRef.current.copy(target);
        //     }
        // }
    });

    return (
        <>
        <OrbitControls
            ref={controlsRef}
            makeDefault
            camera={camera}
            domElement={gl.domElement}
            maxDistance={1_000_000}
            minDistance={10}
            enablePan
            enableZoom />
        </>
    );
}

