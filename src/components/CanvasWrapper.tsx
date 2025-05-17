import { useDXInstances } from '../hooks/useDXInstances.ts';
import { usePointsOfInterest } from '../hooks/usePointsOfInterest.ts';
import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { POI, DX } from './World'
import { Grid } from './Grid';
import { FollowOrbitControls } from './FollowOrbitControls';
import { 
    GizmoViewport,
    GizmoHelper,
 } from '@react-three/drei';
import * as THREE from 'three';
import { useRenderedGrids } from '../hooks/useRenderedGrids.tsx';


/* const grids = [
    { name: 'Sudentor', color: 'red', initialPos: {x: 11, y: 1, z: 0}, movementFn: {x: .001, y: -.003, z: .001} },
    { name: 'Equinox', color: 'blue', initialPos: {x: 15, y: 2, z: 0}, movementFn: {x: .005, y: .001, z: .001} },
    { name: 'Banshee', color: 'green', initialPos: {x: 11, y: 3, z: 0}, movementFn: {x: .002, y: -.001, z: .001} },
    { name: 'Aegir', color: 'purple', initialPos: {x: 12, y: 4, z: 0}, movementFn: {x: .002, y: -.002, z: .001} }
  ];
 */
export function CanvasWrapper() {
    const [ targetRef, setTargetRef ] = useState<THREE.Object3D | null>(null);
    const [ viewMode, setViewMode ] = useState<'zone' | 'system'>('system');
    const viewState = {viewMode, setViewMode};
    const { dx, loadingDX } = useDXInstances();
    const { pois, loadingPOIs } = usePointsOfInterest();
    const grids = useRenderedGrids();
    

    useEffect(() => {
        if (viewMode === 'system') {
            setTargetRef(null);
        }
    }, [viewMode])
    
    return (
        <>
            <button onClick={() => {if (viewMode === 'zone') {setViewMode('system')}}}>System View</button>
            <Canvas>
                <ambientLight />
                <FollowOrbitControls
                    targetRef={targetRef}
                    viewState={viewState}
                />
                <GizmoHelper alignment='bottom-right'>
                    <GizmoViewport />
                </GizmoHelper>
                {/* <axesHelper args={[100]}/> */}
{/*                 {grids.map((grid, i) => (
                        <Grid
                            key={`box-${i}`}
                            name={grid.name}
                            color={grid.color}
                            initialPos={grid.initialPos}
                            movementFn={grid.movementFn}
                            viewState={viewState}
                            onSelect={(ref) => setTargetRef(ref.current)}
                        />
                    ))
                } */}
                {grids.map((grid) => {
                    return (<Grid
                        key={grid.uuid}
                        uuid={grid.uuid}
                        grid_name={grid.grid_name}
                        faction_tag={grid.faction_tag}
                        position={grid.position}
                        created_at={grid.created_at}
                        iff_id={grid.iff_id}
                        viewState={viewState}
                        onSelect={(ref) => setTargetRef(ref.current)}
                    />
                )})
                }
                {!loadingPOIs &&
                    pois.map((poi) => (
                        <POI
                            key={`poi-${poi.id}`}
                            id={poi.id}
                            name={poi.name}
                            pos={poi.position}
                            radius={poi.radius}
                            color={poi.color}
                            viewState={viewState}
                            onSelect={(ref) => setTargetRef(ref.current)}
                        />
                    ))
                }
                {!loadingDX && 
                    dx.map((instance) => (
                        <DX 
                            key={`dx-${instance.id}`}
                            id={instance.id}
                            name={instance.name}
                            pos={instance.position}
                            color={instance.color}
                            radius={instance.radius}
                            viewState={viewState}
                            onSelect={(ref) => setTargetRef(ref.current)}
                        />
                    ))
                }
            </Canvas>
        </>
        )
}