import { FunctionComponent, useState } from 'react';
import randomWords from 'random-words';
import Button from '@mui/material/Button';
import { StatsDisplay, TextTyper, WordDisplay } from '~/components/common';
import { PageLayout } from '~/components/layouts';
import { useTimer } from '~/utilities';

import './appp.scss';

const DISPLAY_COUNT = 5;

const generateRandomWords = (exactly = DISPLAY_COUNT) => randomWords({
  maxLength: 12,
  exactly,
});

const App: FunctionComponent<{}> = () => {
  /* State variables */
  const [actualWords, setActualWords] = useState(generateRandomWords);
  const [typedWords, setTypedWords] = useState<string[]>([]);

  /* Hooks */
  const { secondsLeft, active, dirty, startTimer } = useTimer();

  /* Functions */
  const handleChange = (updatedTypedWordList: string[]) => {
    // Actual words will need to contain new entries if max word count is reached
    if (updatedTypedWordList.length > actualWords.length) {
      setActualWords(actualWords.concat(generateRandomWords()));
    }

    setTypedWords(updatedTypedWordList);

    if (!active) {
      startTimer();
    }
  }

  const handleRestartGame = () => {
    setActualWords(generateRandomWords());
    setTypedWords([]);
    startTimer();
  }

  /* Regular variables */
  const currentWordIndex = typedWords.length === 0 ? 0 : typedWords.length - 1;
  const displayIndex = currentWordIndex - (currentWordIndex % DISPLAY_COUNT);
  const displayedActualWords = actualWords.slice(displayIndex, displayIndex + DISPLAY_COUNT);

  const matchedTypedWords = displayIndex < typedWords.length
    ? typedWords.slice(displayIndex, displayIndex + DISPLAY_COUNT)
    : [];

  return (
    <PageLayout className='app-page-wrapper'>
      <StatsDisplay
        secondsLeft={secondsLeft}
        actualWords={actualWords}
        typedWords={typedWords}
        currentWordIndex={currentWordIndex}
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

export default App;