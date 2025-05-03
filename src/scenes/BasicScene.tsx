import { useRef, useState } from "react"
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface CubeProps {
    color: string;
    initialPos: { x: number; y: number };
    movementFn: { x: number; y: number };
    onSelect?: () => typeof useRef;
  }

export function MovingCube({ color, initialPos, movementFn, onSelect }: CubeProps) {
    const cubeRef = useRef<Mesh>(null!);
    const hasInitialized = useRef(false);
    const speed = 1;

    useFrame((state, delta) => {
        if (!cubeRef.current) return;
        if (!hasInitialized.current) {
            cubeRef.current.position.x += initialPos.x * delta * speed;
            cubeRef.current.position.y += initialPos.y * delta * speed;
        }
        cubeRef.current.position.x += movementFn.x;
        cubeRef.current.position.y += movementFn.y;
    });

    const handleClick = () => {
        if (cubeRef.current) {
            onSelect(cubeRef);
        }
    }

    return (
        <mesh ref={cubeRef} onClick={handleClick}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}