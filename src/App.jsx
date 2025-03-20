import { useEffect, useMemo, useState } from "react";
import { useStatistics } from "./ui/useStatistics";
import { Chart } from "./ui/components/Chart.jsx";
import { Header } from "./ui/components/Header.jsx";

function App() {
  const statistics = useStatistics(10);
  const [activeView, setActiveView] = useState("CPU");

  const cpuUsages = useMemo(
    () => statistics.map((stat) => stat.ramUsage),
    [statistics]
  );
  console.log(statistics);
  const ramUsages = useMemo(
    () => statistics.map((stat) => stat.ramUsage),
    [statistics]
  );
  const storageUsages = useMemo(
    () => statistics.map((stat) => stat.storageUsage),
    [statistics]
  );
  const activeUsages = useMemo(() => {
    switch (activeView) {
      case "CPU":
        return cpuUsages;
      case "RAM":
        return ramUsages;
      case "STORAGE":
        return storageUsages;
      default:
        return cpuUsages;
    }
  }, [activeView, cpuUsages, ramUsages, storageUsages]);

  useEffect(() => {
    return window.electron.subscribeChangeView((view) => setActiveView(view));
  }, []);
  return (
    <>
    <div>
      <Header />
    </div>
      <div className="h-36 w-96 mt-12 ">
        <Chart data={activeUsages} maxDataPoint={10} />{" "}
      </div>
      <div className="text-red-400">Salam, duniya!</div>
    </>
    
  );
}

export default App;
