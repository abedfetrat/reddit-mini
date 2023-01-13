import { useState, useEffect } from "react";

function useLocalStorageState(key, defaultValue) {
    const [data, setData] = useState(() => {
        const persisted = localStorage.getItem(key);
        return persisted ? JSON.parse(persisted) : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(
            key,
            JSON.stringify(data)
        );
    }, [data]);

    return [data, setData];
}

export default useLocalStorageState;