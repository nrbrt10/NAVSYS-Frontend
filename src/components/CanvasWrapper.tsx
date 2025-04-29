import { Canvas } from '@react-three/fiber'
import { BasicScene } from '../scenes/BasicScene'

export function CanvasWrapper() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 75}}>
            <BasicScene />
        </Canvas>
    )
}