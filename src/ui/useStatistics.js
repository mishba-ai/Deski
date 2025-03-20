import { useEffect, useState } from "react";

// This is a custom hook that subscribes to the statistics event
export function useStatistics(dataPointCount ) {
  const [value, setValue] = useState([]);

  useEffect(() => {
    // Check if the API is available before using it
    if (!window.electron || !window.electron.subscribeStatistics) {
      console.error(
        "Electron API not available - subscribeStatistics is missing"
      );
      return () => {}; // Return empty cleanup function
    }

    console.log("Subscribing to statistics updates");
    //@ts-ignore
    const unsub = window.electron.subscribeStatistics((stats) => {
      setValue((prev) => {
        const newData = [...prev, stats];

        if (newData.length > dataPointCount) {
          newData.shift();
        }
        return newData;
      });
    });

    return unsub;
  }, [dataPointCount]);
  return value;
}
