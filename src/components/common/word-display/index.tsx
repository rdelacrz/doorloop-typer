import { FunctionComponent } from 'react';
import clsx from 'clsx';

import './styles.scss';

interface WordDisplayProps {
  className?: string;
  actualWords: string[];
  matchedText: string[];
  currentWordIndex: number;
}

export const WordDisplay: FunctionComponent<WordDisplayProps> = (props) => {
  return (
    <div className={clsx('word-display-wrapper', props.className)}>
      {props.actualWords.map((word, index) => (
        <div className='actual-word-container' key={word + index}>
          <div className={clsx('actual-word', {
            'matched': index < props.matchedText.length && props.actualWords[index] === props.matchedText[index],
            'wrong': index < props.matchedText.length
              && props.actualWords[index] !== props.matchedText[index]
              && index !== props.currentWordIndex,
            'current': index === props.currentWordIndex,
          })}>
            {word}&nbsp;
          </div>
        </div>
      ))}
    </div>
  );
}

export default WordDisplay;