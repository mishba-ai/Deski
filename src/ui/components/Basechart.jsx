import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  Area,
  XAxis,
  YAxis,
} from "recharts";
import PropTypes from "prop-types";

export function Basechart(props) {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <AreaChart data={props.data}>
        <CartesianGrid strokeDasharray="3 3" fill="#1c1c1c" stroke="#333" />
        <Area
          type="monotone"
          dataKey="value"
          stroke={props.stroke}
          fill={props.fill}
          strokeWidth={2}
          isAnimationActive={false}
        />
        <XAxis stroke="transparent" height={0} />
        <YAxis domain={[0, 100]} stroke="transparent" width={0} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// props validation
Basechart.propTypes = {
  data: PropTypes.array.isRequired,
  stroke: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
};
