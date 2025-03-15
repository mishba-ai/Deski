import { useEffect } from "react";

function App() {
  useEffect(() => {
    //@ts-ignore
    window.electron.subscribeStatistics((stats) => {
      console.log(stats);
    });
  }, []);

  return (
    <>
      <div>Salam, duniya!</div>
    </>
  );
}

export default App;
