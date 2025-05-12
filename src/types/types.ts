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

  export type ViewMode = 'zone' | 'system'

  export type ViewState = {
    viewMode: ViewMode
    setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>
  }

  export type CameraContext = {
    camera: THREE.Camera;
    controls: OrbitControls;
    target: THREE.Vector3;
  }

  type CameraBehavior = (ctx: CameraContext) => boolean;