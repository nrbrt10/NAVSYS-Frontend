import { RefObject, useRef } from 'react';
import { Mesh } from 'three';
import { useSelectable } from '../systems/useSelectable.ts'
import * as THREE from 'three';

export interface PlanetProps {
    name: string;
    pos: {x: number, y: number, z: number};
    radius: number;
    color: string;
}

export interface DXProps {
    name: string;
    pos: {x: number, y: number, z: number};
    radius: number;
    color: string;
    onSelect: (ref: RefObject<THREE.Mesh>) => void;
}

export function Planet({name, pos, radius, color}: PlanetProps) {
    const planetRef = useRef<Mesh>(null!);
    const posArray: [number, number, number] = [pos.x, pos.y, pos.z];

    return (
        <mesh ref={planetRef} name={name} position={posArray} >
            <sphereGeometry args={[radius, 16, 16]} />
            <meshStandardMaterial color = {color} />
        </mesh>
    )
}

export function DX({name, pos, radius, color, onSelect }: DXProps & {onSelect: (ref: RefObject<THREE.Mesh>) => void; }) {
    const dxRef = useRef<Mesh>(null!);
    const posArray: [number, number, number] = [pos.x, pos.y, pos.z];

    const { hovered, eventHandlers } = useSelectable(dxRef, onSelect);

    return (
        <mesh ref={dxRef} name={name} position={posArray} {...eventHandlers}>
            <sphereGeometry args={[radius, 16, 16]} />
            <meshStandardMaterial color = {color} opacity={.5} transparent={true}/>
        </mesh>
    )
}