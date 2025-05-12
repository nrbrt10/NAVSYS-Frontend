import { RefObject, useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

import { useSelectable } from '../hooks/useSelectable.ts'
import { ViewState } from '../types/types.ts';

interface GridProps {
    name: string;
    color: string;
    initialPos: {x: number, y: number, z: number};
    movementFn: {x: number, y: number, z: number};
    viewState: ViewState;
    onSelect: (ref: RefObject<THREE.Mesh>) => void;
}

export function Grid({name, color, initialPos, movementFn, viewState, onSelect}: GridProps & {onSelect: (ref: RefObject<THREE.Mesh>) => void; }) {
    const gridRef = useRef<THREE.Mesh>(null!);
    const initialized = useRef(false);
    const position = useRef(new THREE.Vector3());

    const tooltipOffset = useMemo(() => new THREE.Vector3(0, 0.6, 0), []);
    const tooltipPosition = position.current.clone().add(tooltipOffset);

    const { hovered, eventHandlers } = useSelectable(gridRef, viewState, onSelect);

    useEffect(() => {
        if (gridRef.current) {
            gridRef.current.userData.type = 'grid'
        }
    }, [])

    useFrame((state, delta) => {
        if (gridRef.current && !initialized.current) {
            gridRef.current.position.set(initialPos.x, initialPos.y, initialPos.z);
            initialized.current = true;
            gridRef.current.userData.type = 'grid';
        }
        if (gridRef.current && initialized.current) {
            gridRef.current.position.add(new THREE.Vector3(movementFn.x, movementFn.y, movementFn.z))
            position.current.copy(gridRef.current.position);
        }        
    });
    
    return (
        <mesh ref={gridRef} name={name} {...eventHandlers} >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} emissive={hovered ? 'white' : color}/>
            {hovered && (
                <Html position={tooltipPosition}>
                    <div className="tooltip">
                        <strong>{name}</strong>
                        <br />
                        Position: {position.current?.toArray().map((n) => n.toFixed(2)).join(', ')}
                    </div>
                </Html>
            )}
        </mesh>
    )
}