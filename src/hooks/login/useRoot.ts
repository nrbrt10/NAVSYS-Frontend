import { fetchRoot } from "../../systems/api";
import { CanvasWrapper } from "../../components/map/CanvasWrapper";
import { useEffect, useState } from "react";

export function useRoot(pollInterval: number = 2000) {
    const [status, setStatus] = useState<'OK' | null>(null);
    const [loadingMap, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchAndSet = async () => {
            try {
                const data = await fetchRoot();
                if (isMounted) {
                    setStatus(data);
                    setLoading(false);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchAndSet();

        const intervalId = setInterval(fetchAndSet, pollInterval); // Poll every X ms

        return () => {
            isMounted = false;
            clearInterval(intervalId); // Clean up
        };
    }, [pollInterval]);

    return { status, loadingMap }
}