import { useMemo } from "react";
import { Basechart } from "./Basechart";
import PropTypes from "prop-types";

export function Chart(props) {
  const preparedData = useMemo(() => {
    const points = props.data.map((point) => ({ value: point * 100 }));
    return [
      ...points,
      ...Array.from({ length: props.maxDataPoint - points.length }).map(() => ({
        value: undefined,
      })),
    ];
  }, [props.data, props.maxDataPoint]);

  return <Basechart data={preparedData}></Basechart>;
}

//props validation
Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  maxDataPoint: PropTypes.number,
};
