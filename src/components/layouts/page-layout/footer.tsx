import { FunctionComponent } from 'react';
import clsx from 'clsx';
import Container from '@mui/material/Container';

import './footer.scss';

interface FooterProps {
  className?: string;
}

export const Footer: FunctionComponent<FooterProps> = (props) => {
  return (
    <footer className={clsx('footer-wrapper', props.className)}>
      <Container maxWidth='lg'>
        Copyright @ 2022 Doorloop
      </Container>
    </footer>
  );
}

export default Footer;