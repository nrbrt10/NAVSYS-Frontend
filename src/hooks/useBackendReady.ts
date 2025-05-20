import { fetchRoot } from "../systems/api";
import { useEffect, useState } from "react";

export function useBackendReady(pollInterval = 2000) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let isMounted = true;
        let intervalId: number;

        const fetchAndCheck = async () => {
            if (ready) return;
            
            try {
                const response = await fetchRoot();
                
                if (!isMounted) return;

                if (response.message === 'OK') {
                    setReady(true)
                }
            } catch (err) {
            console.log(err)
        }
    };

    fetchAndCheck();
    intervalId = setInterval(fetchAndCheck, pollInterval);
    
    return () => {
        isMounted = false;
        clearInterval(intervalId);
    };

    }, [ready, pollInterval]);

    return ready;
}