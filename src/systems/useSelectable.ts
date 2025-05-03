import { useState, RefObject } from 'react';
import * as THREE from 'three'

export function useSelectable(
    meshRef: RefObject<THREE.Mesh>,
    onSelect: (ref: RefObject<THREE.Mesh>) => void,
    onHover?: () => void
) {
    const [hovered, setHovered] = useState(false);

    const eventHandlers = {
        onClick: () => {
            if (meshRef.current) {
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
