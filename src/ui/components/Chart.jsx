import { useMemo } from 'react';
import { Basechart } from './Basechart';
import PropTypes from 'prop-types';
import {COLOR_MAP} from '../constants.js'

export function Chart(props) {
  const color = useMemo(
    () => COLOR_MAP[props.selectedView] || COLOR_MAP.CPU,
    [props.selectedView]
  );
  
  const preparedData = useMemo(() => {
    if (!props.data || !Array.isArray(props.data)) {
      return Array.from({ length: props.maxDataPoints || 0 }).map(() => ({
        value: undefined,
      }));
    }
    
    const points = props.data.map((point) => ({ value: point * 100 }));
    return [
      ...points,
      ...Array.from({ length: (props.maxDataPoints || 0) - points.length }).map(
        () => ({ value: undefined })
      ),
    ];
  }, [props.data, props.maxDataPoints]);

  return (
    <Basechart 
      data={preparedData} 
      fill={color.fill} 
      stroke={color.stroke} 
    />
  );
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
  maxDataPoints: PropTypes.number,
  selectedView: PropTypes.oneOf(['CPU', 'RAM', 'STORAGE'])
};

Chart.defaultProps = {
  data: [],
  maxDataPoints: 10,
  selectedView: 'CPU'
};