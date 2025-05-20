import { useEffect, useRef } from "react";
import { useLatestGrids } from "./useLatestGrids";
import { Grid } from "../types/types";

export function useRenderedGrids() {
    const { latestGrids, loadingLatestGrids } = useLatestGrids();

    const renderedGrids = useRef(new Map<string, Grid>());
    const staleGridCounter = useRef(new Map<string, number>());

    useEffect(() => {
        if (loadingLatestGrids || latestGrids.length === 0) return;

        const newIDs = new Set(latestGrids.map(g => g.uuid));
        
        latestGrids.forEach((grid) => {
            renderedGrids.current.set(grid.uuid, grid);
            staleGridCounter.current.set(grid.uuid, 0);
        });
        
        renderedGrids.current.forEach((_, uuid) => {
            if (!newIDs.has(uuid)) {
                const counter = staleGridCounter.current.get(uuid) ?? 0;
                if (counter >= 3) {
                    renderedGrids.current.delete(uuid);
                    staleGridCounter.current.delete(uuid);
                } else {
                    staleGridCounter.current.set(uuid, counter + 1);
                }
            }
        });
    }, [latestGrids, loadingLatestGrids]);
    return Array.from(renderedGrids.current.values());
}

