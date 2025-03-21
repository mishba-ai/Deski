import { useEffect, useMemo, useState } from "react";
import { useStatistics } from "./ui/useStatistics";
import { Chart } from "./ui/components/Chart.jsx";
import { Header } from "./ui/components/Header.jsx";
import { SelectOptions } from "./ui/components/SelectedOptions";

function App() {
  const staticData = useStaticData();
  const statistics = useStatistics(10);
  const [activeView, setActiveView] = useState("CPU");

  const cpuUsages = useMemo(
    () => statistics.map((stat) => stat.cpuUsage),
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

  function useStaticData() {
    const [staticData, setStaticData] = useState(null);

    useEffect(() => {
      (async () => {
        setStaticData(await window.electron.getStaticData());
      })();
    }, []);

    return staticData;
  }

  return (
    <>
      {/* <Header /> */}

      <div className="grid grid-cols-10">
        <div>
          <SelectOptions
            title="CPU"
            styles="text-red-400 "
            Data={cpuUsages}
            subTitle={staticData?.cpuModel ?? " "}
            onClick={()=>setActiveView('CPU')}
          />
          <SelectOptions
            title="RAM"
            styles=""
            Data={ramUsages}
            subTitle={(staticData?.totalMemoryGB.toString() ?? "") + " GB"}
            onClick={()=>setActiveView('RAM')}

          />
          <SelectOptions
            title="STORAGE"
            styles=""
            Data={storageUsages}
            subTitle={(staticData?.totalStorage.toString() ?? "") + " GB"}
            onClick={()=>setActiveView('STORAGE')}

          />
        </div>
      </div>
      <div className="h-36 w-96 mt-12 ">
        <Chart
          data={activeUsages}
          maxDataPoints={10}
          selectedView={activeView}
        />{" "}
      </div>
      <div className="text-red-400">Salam, duniya!</div>
    </>
  );
}

export default App;
