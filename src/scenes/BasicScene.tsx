import { useRef } from "react"
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

export function BasicScene() {
    const cubeRef = useRef<Mesh>(null!);

    useFrame(() => {
        if (cubeRef.current) {
            cubeRef.current.rotation.x += 0.01;
            cubeRef.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh ref={cubeRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color='orange' />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
        </mesh>
    )
}