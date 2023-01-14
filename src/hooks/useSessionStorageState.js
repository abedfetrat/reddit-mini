import { useState, useEffect } from "react";

function useSessionStorageState(key, defaultValue) {
    const [data, setData] = useState(() => {
        const persisted = sessionStorage.getItem(key);
        return persisted ? JSON.parse(persisted) : defaultValue;
    });

    useEffect(() => {
        sessionStorage.setItem(
            key,
            JSON.stringify(data)
        );
    }, [data]);

    return [data, setData];
}

export default useSessionStorageState;