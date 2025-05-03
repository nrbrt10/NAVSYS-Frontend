import { RefObject, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSelectable } from '../systems/useSelectable.ts'
import * as THREE from 'three';

interface GridProps {
    name: string;
    color: string;
    initialPos: {x: number, y: number, z: number};
    movementFn: {x: number, y: number, z: number};
    onSelect: (ref: RefObject<THREE.Mesh>) => void;
}

export function Grid({name, color, initialPos, movementFn, onSelect}: GridProps & {onSelect: (ref: RefObject<THREE.Mesh>) => void; }) {
    const gridRef = useRef<THREE.Mesh>(null!);
    const [hasInitialized, setInitialized] = useState(false);

    const { hovered, eventHandlers } = useSelectable(gridRef, onSelect);

    useFrame((state, delta) => {
        if (gridRef.current && !hasInitialized) {
            gridRef.current.position.set(initialPos.x, initialPos.y, initialPos.z);
            setInitialized(true);
        }
        if (gridRef.current && hasInitialized) {
            gridRef.current.position.add(new THREE.Vector3(movementFn.x, movementFn.y, movementFn.z))
        }
    
    })
    return (
        <mesh ref={gridRef} name={name} {...eventHandlers} >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}