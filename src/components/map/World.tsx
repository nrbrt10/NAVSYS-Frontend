import { RefObject, useRef, useEffect } from 'react';
import { Mesh } from 'three';
import * as THREE from 'three';
import { useSelectable } from '../../hooks/useSelectable.ts'
import { scalePosition, scaleValue } from '../../utils/scalePositions.ts';
import { ViewState } from '../../types/types.ts';
import { Tooltip } from './Tooltip.tsx';

export interface WorldProps {
    id: number;
    name: string;
    pos: {x: number, y: number, z: number};
    radius: number;
    color: string;
    viewState: ViewState;
    onSelect: (ref: RefObject<THREE.Mesh>) => void;
}

export function POI({name, pos, radius, color, viewState, onSelect}: WorldProps & {onSelect: (ref: RefObject<THREE.Mesh>) => void;}) {
    const poiRef = useRef<Mesh>(null!);
    const scaledPosition = scalePosition(pos, viewState.viewMode);
    const scaledRadius = scaleValue(radius, viewState.viewMode);
    const posArray: [number, number, number] = [scaledPosition.x, scaledPosition.y, scaledPosition.z];

    const { hovered, eventHandlers } = useSelectable(poiRef, viewState, onSelect);

    useEffect(() => {
        if (poiRef.current) {
            poiRef.current.userData.type = 'poi';
            poiRef.current.userData.radius = scaledRadius;
        }
    }, [viewState.viewMode])

    return (
        <>
            <Tooltip
                data={name}
                position={scaledPosition}
                viewMode={viewState.viewMode}
                hovered={hovered}
            />
            <mesh ref={poiRef} name={name} position={posArray} {...eventHandlers}>
                <sphereGeometry args={[scaledRadius, 16, 16]} />
                <meshStandardMaterial color = {color} emissive={hovered ? "cornsilk": color}/>
            </mesh>

        </>
    )
}

export function DX({name, pos, radius, color, viewState, onSelect}: WorldProps & {onSelect: (ref: RefObject<THREE.Mesh>) => void;}) {
    const dxRef = useRef<Mesh>(null!);
    const {x, y, z} = scalePosition(pos, viewState.viewMode);
    const scaledRadius = scaleValue(radius, viewState.viewMode)
    const posArray: [number, number, number] = [x, y, z];

    const { eventHandlers } = useSelectable(dxRef, viewState, onSelect);

    useEffect(() => {
        if (dxRef.current) {
            dxRef.current.userData.type = 'dx';
            dxRef.current.userData.radius = scaledRadius;
        }
    }, [])
    
    return (
        <mesh ref={dxRef} name={name} position={posArray} {...eventHandlers}>
            <sphereGeometry args={[scaledRadius, 16, 16]} />
            <meshStandardMaterial color = {color} opacity={.1} transparent={true} depthWrite={false}/>
        </mesh>
    )
}