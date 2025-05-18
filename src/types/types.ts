import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export type DXInstance = {
    id: number;
    dx: string;
    name: string;
    position: {
      x: number;
      y: number;
      z: number;
    };
    color: string;
    radius: number;
  };

  export type PointOfInterest = {
    id: number;
    name: string;
    position: {
      x: number;
      y: number;
      z: number;
    };
    color: string;
    radius: number;
  };

  export type Grid = {
    uuid: string;
    grid_name: string;
    faction_tag: string;
    position: {
      x: number;
      y: number;
      z: number;
    };
    created_at: string;
    iff_id: string;
  }

  export type ViewMode = 'zone' | 'system'

  export type ViewState = {
    viewMode: ViewMode
    setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>
  }

  export type CameraContext = {
    camera: THREE.Camera;
    controls: React.ComponentRef<typeof OrbitControls> | null;
    target: THREE.Vector3;
  }

  export type CameraBehavior = (ctx: CameraContext) => boolean;