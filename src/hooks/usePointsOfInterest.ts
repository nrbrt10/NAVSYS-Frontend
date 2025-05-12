import { useEffect, useState } from "react";
import { PointOfInterest } from "../types/types";
import { fetchPointsOfInterest } from "../systems/api";

export function usePointsOfInterest() {
    const [pois, setPOIs] = useState<PointOfInterest[]>([])
    const [loadingPOIs, setLoading ] = useState(true);

    useEffect(() => {
        fetchPointsOfInterest().then((data) => {
            setPOIs(data);
            setLoading(false);
        });
    }, []);

    return { pois, loadingPOIs }
}