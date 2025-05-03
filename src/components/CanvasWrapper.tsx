import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Planet, DX } from './World'
import { Grid } from './SEGrid';
import { 
    GizmoViewport,
    GizmoHelper,
    OrbitControls
 } from '@react-three/drei';
import * as THREE from 'three';

const grids = [
    { name: 'Sudentor', color: 'red', initialPos: {x: 11, y: 1, z: 0}, movementFn: {x: .001, y: -.003, z: .001} },
    { name: 'Equinox', color: 'blue', initialPos: {x: 15, y: 2, z: 0}, movementFn: {x: .005, y: .001, z: .001} },
    { name: 'Banshee', color: 'green', initialPos: {x: 11, y: 3, z: 0}, movementFn: {x: .002, y: -.001, z: .001} },
    { name: 'Aegir', color: 'purple', initialPos: {x: 12, y: 4, z: 0}, movementFn: {x: .002, y: -.002, z: .001} }
  ];

const planets = [
    { name: 'Earth', pos: {x: 0, y: 0, z: 0}, radius: 10, color: 'blue' },
    { name: 'Luna', pos: {x: 0, y: 15, z: 15}, radius: 2, color: 'gray' },
    { name: 'Mars', pos: {x: 0, y: 30, z: 0}, radius: 4, color: 'red' }
]

const dx = [
    { name: 'dx1', pos: {x: 0, y: 0, z: 0}, radius: 50, color: 'white'},
    { name: 'dx2', pos: {x: 80, y: 0, z: 5}, radius: 20, color: 'white'}
]

export function CanvasWrapper() {
    const [targetRef, setTargetRef] = useState<THREE.Object3D | null>(null);

        return (
            <Canvas>
                <ambientLight />
                <OrbitControls enablePan enableZoom target={targetRef?.position ?? new THREE.Vector3(0, 0, 0)} />
                <GizmoHelper alignment='bottom-right'>
                    <GizmoViewport />
                </GizmoHelper>
                <axesHelper args={[100]}/>
                {grids.map((grid) => (
                    <Grid
                        name={grid.name}
                        color={grid.color}
                        initialPos={grid.initialPos}
                        movementFn={grid.movementFn}
                        onSelect={(ref) => setTargetRef(ref.current)}
                    />)
                )
                }
                {planets.map((planet) => (
                    <Planet
                        name={planet.name}
                        pos={planet.pos}
                        radius={planet.radius}
                        color={planet.color}
                    />
                    )
                )}
                {dx.map((dx) => (
                    <DX
                        name={dx.name}
                        pos={dx.pos}
                        radius={dx.radius}
                        color={dx.color}
                        onSelect={(ref) => setTargetRef(ref.current)}
                    />
                    )
                )}
            </Canvas>
        )

}