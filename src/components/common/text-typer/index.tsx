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
  onChange: (updatedWordList: string[]) => void;
}

export const TextTyper: FunctionComponent<TextTyperProps> = (props) => {
  /* State and reference variables */
  const wordList = (props.wordList || []);
  const [text, setText] = useState(() => wordList.length > 0 ? wordList[wordList.length - 1] : '');
  const [focused, setFocused] = useState(false);
  const inputRef = createRef<HTMLInputElement>();

  /* Functions */
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const value = event.target.value.toLowerCase();
    let updatedWords = (props.wordList || []).slice(0);

    // Updates list of words based on latest character
    if (value.length > 0) {
      // Checks if latest character is empty space (means moving on to next word)
      if (value[value.length - 1] === ' ') {
        // Only processes space if letters already are in text field
        if (value.trim().length > 0) {
          updatedWords.push('');
          setText('');
        }
  
      // If latest char is a letter, updates latest word in word list
      } else {
        if (updatedWords.length === 0) {
          updatedWords = [value];
        } else {
          updatedWords[updatedWords.length - 1] = value;
        }
        setText(value);
      }
    } else {
      setText(value);
    }
    
    props.onChange(updatedWords);
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