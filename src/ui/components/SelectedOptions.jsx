import PropTypes from "prop-types";
import { Chart } from "./Chart";
import propTypes from "prop-types";

export function SelectOptions({ title, styles, Data, subTitle,onClick }) {
  return (
    <>
      <button onClick={onClick} className={`block p-0.5 w-full ${styles}`}>
        <div className="flex gap-x-2">
          <div>{title}</div>
          <div>{subTitle}</div>
        </div>
        <div className="h-28 w-96">
          <Chart data={Data} maxDataPoint={10} />
        </div>
      </button>
    </>
  );
}

SelectOptions.propTypes = {
  title: propTypes.string.isRequired,
  styles: propTypes.string,
  Data: propTypes.arrayOf(propTypes.number),
  subTitle: propTypes.string,
  onClick:PropTypes.button
};
