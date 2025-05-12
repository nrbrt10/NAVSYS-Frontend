export function scalePosition({x, y, z}:{x: number, y: number, z: number}, viewMode: 'system' | 'zone') {
    const factor = viewMode === 'system' ? 50000 : 5000;
    return {
        x: x / factor,
        y: y / factor,
        z: z / factor
    }
}

export function scaleValue(val: number, viewMode: 'system' | 'zone') {
    const factor = viewMode === 'system' ? 50000 : 5000;
    return val / factor
}

export function scalePositionSystemView({x, y, z}:{x: number, y: number, z: number}) {
    return {
        x: x / 50000,
        y: y / 50000,
        z: z / 50000
    }
}

export function scaleValueSystemView(val: number) {
    return val / 50000
}