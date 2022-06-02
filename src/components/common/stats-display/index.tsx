import { FunctionComponent } from 'react';
import clsx from 'clsx';

import './styles.scss';

interface StatsDisplayProps {
  className?: string;
  secondsLeft: number;
  numberOfMatches: number;
  mistakeCount: number;
}

export const StatsDisplay: FunctionComponent<StatsDisplayProps> = (props) => {
  return (
    <div className='stats-display-wrapper'>
      <div className='stat-container'>
        <span className='label'>
          Seconds left:
        </span> <span className='seconds'>
          {props.secondsLeft}
        </span>
      </div>
      <div className='stat-container'>
        <span className='label'>
          Number of matches:
        </span> <span className={clsx('count', { 'no-matches': props.numberOfMatches === 0 })}>
          {props.numberOfMatches}
        </span>
      </div>
      <div className='stat-container'>
        <span className='label'>
          Number of mistakes:
        </span> <span className='mistakes'>
          {props.mistakeCount}
        </span>
      </div>
    </div>
  );
}

export default StatsDisplay;