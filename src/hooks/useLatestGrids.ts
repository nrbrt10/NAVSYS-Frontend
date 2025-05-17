import { useState, useEffect } from "react";
import { fetchLatestGrids } from "../systems/api";
import { Grid } from "../types/types";

export function useLatestGrids(pollInterval: number = 2000) {
    const [ latestGrids, setLatestGrids ] = useState<Grid[]>([]);
    const [ loadingLatestGrids, setLoading ] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchAndSet = async () => {
            try {
                const data = await fetchLatestGrids();
                if (isMounted) {
                    setLatestGrids(data);
                    setLoading(false);
                }
            } catch (err) {
                console.error("Error fetching latest grids:", err);
            }
        };

        fetchAndSet(); // Call once on mount

        const intervalId = setInterval(fetchAndSet, pollInterval); // Poll every X ms

        return () => {
            isMounted = false;
            clearInterval(intervalId); // Clean up
        };
    }, [pollInterval]);

    return { latestGrids, loadingLatestGrids };
}