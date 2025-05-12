import { useEffect, useState } from "react";
import { DXInstance } from "../types/types";
import { fetchDXInstances } from "../systems/api";

export function useDXInstances() {
    const [dx, setDX] = useState<DXInstance[]>([])
    const [loadingDX, setLoading ] = useState(true);

    useEffect(() => {
        fetchDXInstances().then((data) => {
            setDX(data);
            setLoading(false);
        });
    }, []);

    return { dx, loadingDX }
}