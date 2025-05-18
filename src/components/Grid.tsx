import { RefObject, useRef, useEffect } from 'react';
import { scalePosition } from '../utils/scalePositions.ts';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Tooltip } from './Tooltip.tsx';
import { useSelectable } from '../hooks/useSelectable.ts'
import { ViewState } from '../types/types.ts';

interface GridProps {
    uuid: string;
    grid_name: string;
    faction_tag: string;
    position: {
      x: number;
      y: number;
      z: number;
    };
    created_at: string;
    iff_id: string;
    viewState: ViewState;
    onSelect: (ref: RefObject<THREE.Mesh>) => void;
}

export function Grid({uuid, grid_name, faction_tag, position, created_at, iff_id, viewState, onSelect}: GridProps & {onSelect: (ref: RefObject<THREE.Mesh>) => void; }) {
    const gridRef = useRef<THREE.Mesh>(null!);
    const initialized = useRef(false);
    const scaledPosition = scalePosition(position, viewState.viewMode);
    const { hovered, eventHandlers } = useSelectable(gridRef, viewState, onSelect);

    const color = (() => {
        if (iff_id === 'Enemies' || iff_id === 'NoOwnership') return '#fc0303';
        if (iff_id === 'Owner' || iff_id === 'FactionShare') return '#24fc03';
        if (iff_id === 'Neutral') return '#fcf803';
        else return '#fc0303';
    })();

    useEffect(() => {
        if (gridRef.current) {
            gridRef.current.userData.type = 'grid'
        }
    }, [])

    useFrame(() => {
        if (gridRef.current && !initialized.current) {
            gridRef.current.position.set(scaledPosition.x, scaledPosition.y, scaledPosition.z);
            initialized.current = true;
            gridRef.current.userData.type = 'grid';
        }

        if (gridRef.current) {
            gridRef.current.position.set(scaledPosition.x, scaledPosition.y, scaledPosition.z);
        }
    });

    return (
        <>
            <mesh ref={gridRef} name={grid_name} {...eventHandlers} >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={color} emissive={hovered ? 'white' : color}/>
            </mesh>
            <Tooltip
                data={`${faction_tag}.${grid_name}`}
                position={scaledPosition}
                viewMode={viewState.viewMode}
                hovered={hovered}
            />
        </>
    )
}

