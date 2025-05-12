import { useState, RefObject } from 'react';
import * as THREE from 'three'

import { ViewState } from '../types/types';

export function useSelectable(
    meshRef: RefObject<THREE.Mesh>,
    viewState: ViewState,
    onSelect: (ref: RefObject<THREE.Mesh>) => void,
    onHover?: () => void,
) {
    const [hovered, setHovered] = useState(false);

    const eventHandlers = {
        onDoubleClick: () => {
            if (meshRef.current.userData.type === 'dx' && viewState.viewMode === 'system') {
                viewState.setViewMode('zone');
                onSelect(meshRef);
            }
            if (meshRef.current.userData.type === 'grid' && viewState.viewMode === 'zone'){
                onSelect(meshRef);
            }
            if (meshRef.current.userData.type === 'poi' && viewState.viewMode === 'zone'){
                onSelect(meshRef);
            }
        },
        onPointerOver: () => {
            setHovered(true);
            onHover?.()
        },
        onPointerOut: () => {
            setHovered(false);
        }
    }

    return { eventHandlers, hovered };
}
