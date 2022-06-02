import { FunctionComponent, useMemo, useState } from 'react';
import clsx from 'clsx';
import randomWords from 'random-words';
import Button from '@mui/material/Button';
import { StatsDisplay, TextTyper, WordDisplay } from '~/components/common';
import { PageLayout } from '~/components/layouts';
import { useTimer } from '~/utilities';

import './app.scss';

const DISPLAY_COUNT = 5;

const generateRandomWords = (exactly = DISPLAY_COUNT) => randomWords({
  maxLength: 12,
  exactly,
});

const App: FunctionComponent<{}> = () => {
  /* State variables */
  const [actualWords, setActualWords] = useState(generateRandomWords);
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  /* Hooks */
  const { secondsLeft, active, dirty, startTimer } = useTimer();

  /* Calculated variables */
  const { numberOfMatches, mistakeCount } = useMemo(() => {
    let mistakeCount = 0;
    const numberOfMatches = typedWords.reduce((count, typedWord, index) => {
      if (index < actualWords.length) {
        if (actualWords[index] === typedWord) {
          return count + 1;
        } else if (index !== currentWordIndex) {
          mistakeCount++;
        }
      }
      return count;
    }, 0);
    return { numberOfMatches, mistakeCount };
  }, [typedWords, actualWords, currentWordIndex]);

  /* Functions */
  const handleChange = (value: string, updatedTypedWordList: string[]) => {
    const endsWithSpace = value.endsWith(' ');

    // Actual words will need to contain new entries if max word count is reached
    if (updatedTypedWordList.length >= actualWords.length && endsWithSpace) {
      setActualWords(actualWords.concat(generateRandomWords()));
    }

    // Determines current word index (if text ends with space, adds 1 more to current word list count)
    if (endsWithSpace) {
      setCurrentWordIndex(updatedTypedWordList.length);
    } else {
      setCurrentWordIndex(updatedTypedWordList.length === 0 ? 0 : updatedTypedWordList.length - 1);
    }

    setTypedWords(updatedTypedWordList);

    if (!active) {
      startTimer();
    }
  }

  const handleRestartGame = () => {
    setActualWords(generateRandomWords());
    setTypedWords([]);
    setCurrentWordIndex(0);
    startTimer();
  }

  /* Regular variables */
  const displayIndex = currentWordIndex - (currentWordIndex % DISPLAY_COUNT);
  const displayedActualWords = actualWords.slice(displayIndex, displayIndex + DISPLAY_COUNT);

  const matchedTypedWords = displayIndex < typedWords.length
    ? typedWords.slice(displayIndex, displayIndex + DISPLAY_COUNT)
    : [];

  return (
    <PageLayout className='app-page-wrapper'>
      <StatsDisplay
        secondsLeft={secondsLeft}
        numberOfMatches={numberOfMatches}
        mistakeCount={mistakeCount}
      />
      {!active && (
        <p className='instructions'>
          {dirty
            ? 'Time is up! If you wish to play again, please click the Restart Game button below.'
            : 'The timer will start the moment you type your very first letter into the box...'}
        </p>
      )}
      
      <div className='game-section-wrapper'>
        {dirty && !active
          ? <Button
              id='restartGame'
              color='primary'
              variant='contained'
              onClick={handleRestartGame}
            >
              Restart Game
            </Button>
          : (
            <>
              <WordDisplay
                actualWords={displayedActualWords}
                matchedText={matchedTypedWords}
                currentWordIndex={currentWordIndex % DISPLAY_COUNT}
              />
              <TextTyper
                id='typedWords'
                wordList={typedWords}
                onChange={handleChange}
              />
            </>
          )}
      </div>

    </PageLayout>
  )
}

export default App
