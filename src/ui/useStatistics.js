import { useEffect, useState } from "react";

// This is a custom hook that subscribes to the statistics event
export function useStatistics(dataPointCount) {
    const [value,setValue] = useState([]);

    useEffect(() => {
        const unsub = window.electron.subscribeStatistics((stats) => {
          setValue(prev => {
            const newData = [...prev, stats]

            if(newData.length > dataPointCount){
                newData.shift()
            }
            return newData;
          })
        });
        return unsub
    })
    return value;
}