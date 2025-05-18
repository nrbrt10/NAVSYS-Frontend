import { useMemo } from "react";
import * as THREE from 'three';
import { Billboard, Text } from "@react-three/drei";
import { ViewMode } from "../types/types";
import { scaleValue } from "../utils/scalePositions";


interface TooltipProps {
    data: string;
    position: {
        x: number,
        y: number,
        z: number
    };
    viewMode: ViewMode;
    hovered: boolean;
}

export function Tooltip({data, position, viewMode, hovered} : TooltipProps) {
    const offset = scaleValue(100000, viewMode);
    const tt_pos = useMemo(() => new THREE.Vector3(position.x, position.y - offset, position.z + offset),[position.x, position.y, position.z, offset]);

    if (!hovered) return null;

    return (
        <Billboard position={tt_pos} follow={true} lockX={false} lockY={false} lockZ={false}>
            <Text font="/assets/fonts/helvetiker_regular.typeface.json" fontSize={10} color="white">
                {`${data}`}
            </Text>
        </Billboard>
        );
}