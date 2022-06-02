import { FunctionComponent, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import clsx from 'clsx';

import './styles.scss';

interface StatsDisplayProps {
  className?: string;
  secondsLeft: number;
  typedWords: string[];
  actualWords: string[];
  currentWordIndex: number;
}

export const StatsDisplay: FunctionComponent<StatsDisplayProps> = (props) => {
  /* Calculated variables */
  const { matches, numberOfMatches, mistakeCount } = useMemo(() => {
    let matches: string[] = [];
    let mistakeCount = 0;
    const numberOfMatches = props.typedWords.reduce((count, typedWord, index) => {
      if (index < props.actualWords.length) {
        if (props.actualWords[index] === typedWord) {
          matches.push(typedWord);
          return count + 1;
        } else if (index !== props.currentWordIndex) {
          mistakeCount++;
        }
      }
      return count;
    }, 0);
    return { matches, numberOfMatches, mistakeCount };
  }, [props.typedWords, props.actualWords, props.currentWordIndex]);

  const { lettersMatched, averageMatchLength } = useMemo(() => {
    let lettersMatched = 0;
    const averageMatchLength = matches.length > 0
      ? (
        matches.reduce((sum, match) => {
          lettersMatched += match.length;
          return sum + match.length;
        }, 0) / matches.length
      ).toFixed(4)
      : '0';
    return { lettersMatched, averageMatchLength };
  }, [matches]);

  /* Regular variables */
  const timeElapsed = 60 - props.secondsLeft;
  const averageWordsPerSecond = timeElapsed
    ? numberOfMatches / timeElapsed
    : numberOfMatches;
  const averageLettersPerSecond = timeElapsed
    ? lettersMatched / timeElapsed
    : lettersMatched;

  return (
    <Grid className='stats-display-wrapper' container rowSpacing={2}>
      <Grid item xs={12} sm={6}>
        <div className='stat-container'>
          <span className='label'>
            Number of matches:
          </span> <span className='count'>
            {numberOfMatches}
          </span>
        </div>
        <div className='stat-container'>
          <span className='label'>
            Number of mistakes:
          </span> <span className='mistakes'>
            {mistakeCount}
          </span>
        </div>
        <div className='stat-container'>
          <span className='label'>
            Average matched word length:
          </span> <span className='stat'>
            {averageMatchLength}
          </span>
        </div>
        <div className='stat-container'>
          <span className='label'>
            Average words/sec:
          </span> <span className='stat'>
            {averageWordsPerSecond.toFixed(4)}
          </span>
        </div>
        <div className='stat-container'>
          <span className='label'>
            Average letters/sec:
          </span> <span className='stat'>
            {averageLettersPerSecond.toFixed(4)}
          </span>
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <div className='stat-container timer'>
          <span className='label'>
            Seconds left:
          </span> <span className={clsx('seconds', {
            'medium': props.secondsLeft >= 5 && props.secondsLeft < 20,
            'low': props.secondsLeft < 5,
          })}>
            {props.secondsLeft}
          </span>
        </div>
      </Grid>
    </Grid>
  );
}

export default StatsDisplay;