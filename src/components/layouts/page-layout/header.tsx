import { FunctionComponent, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Container from '@mui/material/Container';
import { useWindowSize } from '~/utilities';

import './header.scss';

interface HeaderProps {
  className?: string;
  onHeaderHeightUpdate: (headerHeight: number) => void;
}

export const Header: FunctionComponent<HeaderProps> = (props) => {
  const headerRef = useRef<HTMLElement>(null);
  const { width } = useWindowSize();

  // If window width changes, gets newest header height
  useEffect(() => {
    const headerRect = headerRef?.current?.getBoundingClientRect();
    if (headerRect) {
      props.onHeaderHeightUpdate(headerRect.height);
    }
  }, [width]);

  return (
    <header className={clsx('header-wrapper', props.className)} ref={headerRef}>
      <Container maxWidth='lg'>
        Doorloop Typer
      </Container>
    </header>
  );
}

export default Header;