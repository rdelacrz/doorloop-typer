import { ChangeEvent, createRef, FocusEvent, FunctionComponent, KeyboardEvent, MouseEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import TextField from '@mui/material/TextField';

import './styles.scss';

const ASCII_START = 'a'.charCodeAt(0);
const ASCII_END = 'z'.charCodeAt(0);

interface TextTyperProps {
  id?: string;
  className?: string;
  wordList?: string[];
  onChange: (value: string, updatedWordList: string[]) => void;
}

export const TextTyper: FunctionComponent<TextTyperProps> = (props) => {
  const wordList = (props.wordList || []);
  const latestWord = useRef(wordList.length > 0 ? wordList[wordList.length - 1] : null);

  const [text, setText] = useState(() => wordList.join(' '));
  const [focused, setFocused] = useState(false);

  const inputRef = createRef<HTMLInputElement>();

  const handleMouseDown = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!focused) {
      inputRef.current?.focus();
    }
  }

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.target.selectionStart = event.target.selectionEnd;
    setFocused(true);
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFocused(false);
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const ascii = event.key.charCodeAt(0);
    
    // Only allows letters and spaces
    const keyAllowable = (ascii >= ASCII_START && ascii <= ASCII_END)
      || event.key === 'Backspace'
      || event.key === ' ';

    if (event.ctrlKey || !keyAllowable) {
      event.preventDefault();
    }
  }

  // Note: Function is implemented this way (as opposed to simply using props.wordList.join(' ') to generate a new list
  // every time), because this is more performance efficient (appends to or pops from list rather than iterating through
  // whole list every time handleChange is called)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const value = event.target.value.toLowerCase();
    const letterRemoved = value.length < text.length;

    let updatedWords = (props.wordList || []).slice(0);

    // Updates list of words based on latest character
    if (value.length > 0) {
      // Checks if latest char is empty space (if result of backspace, may mean word was deleted)
      if (value[value.length - 1] === ' ') {
        if (letterRemoved && latestWord.current !== ' ') {
          updatedWords.pop();
        }
        latestWord.current = ' ';

      // If latest char is a letter, checks if stored word is currently not a word
      } else if (!latestWord.current || latestWord.current === ' ') {
        if (letterRemoved) {
          const lastWordCutoff = value.lastIndexOf(' ');
          latestWord.current = lastWordCutoff < 0 ? value : value.substring(lastWordCutoff + 1);
        } else {
          // Means new word has been typed and should be added to list of words
          latestWord.current = value[value.length - 1];
          updatedWords.push(latestWord.current);
        }

      // Means latest word has been updated
      } else {
        if (letterRemoved) {
          latestWord.current = latestWord.current.substring(0, latestWord.current.length - 1);
        } else {
          latestWord.current += value[value.length - 1];
        }
        updatedWords[updatedWords.length - 1] = latestWord.current;
      }
    } else {
      latestWord.current = null;
      updatedWords = [];
    }
    
    // Sets value in text field
    setText(value);
    props.onChange(value, updatedWords);
  }

  return (
    <div
      className={clsx('text-typer-wrapper', props.className)}
      onMouseDown={handleMouseDown}
    >
      <TextField
        id={props.id}
        className='text-typer-container'
        placeholder='Type words here...'
        value={text || ''}
        variant='standard'
        fullWidth
        inputRef={inputRef}
        focused={focused}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </div>
  )
}

export default TextTyper;