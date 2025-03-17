// import { useEffect } from "react";
// import { Basechart } from "./ui/components/Basechart";
import { useMemo } from "react";
import { useStatistics } from "./ui/useStatistics";
import { Chart } from "./ui/components/Chart.jsx";
function App() {
  const statistics = useStatistics(10);

  //useMemo is used to prevent re-rendering of the component when the statistics are updated
  const cpuUsages = useMemo(
    () => statistics.map((stat) => stat.ramUsage),
    [statistics]
  );
  console.log(statistics);

  return (
    <>
      <div style={{ height: 120 }}>
        <Chart data={cpuUsages} maxDataPoint={10}/>{" "}
      </div>
      <div>Salam, duniya!</div>
      {/* <div style={{height:120}}>
      <Basechart
        data={[{ value: 25 }, { value: 30 }, { value: 100 }]}
        stroke="red"
        fill="blue"
      /></div> */}
    </>
  );
}

export default App;
