import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber'
import { 
    OrbitControls
 } from '@react-three/drei';
import * as THREE from 'three';

interface ControllerProps {
    targetRef: React.RefObject<any> | null; 
}

export function CameraController({ targetRef }) {
    const controlsRef = useRef<any>();

    useFrame(() => {
        if (targetRef?.curret) {

            const pos = targetRef.current.position;
            controlsRef.current.target.copy(pos);
            controlsRef.current.update();
        }
        });
    
    return <OrbitControls enablePan enableRotate ref={controlsRef}/>
}