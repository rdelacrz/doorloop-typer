import { FunctionComponent, PropsWithChildren, useEffect, useState } from 'react';
import clsx from 'clsx';
import Container from '@mui/material/Container';
import { useWindowSize } from '~/utilities';
import Header from './header';
import Footer from './footer';

import './styles.scss';

interface PageLayoutProps {
  className?: string;
}

export const PageLayout: FunctionComponent<PropsWithChildren<PageLayoutProps>> = ({ children, className }) => {
  const [paddingTop, setPaddingTop] = useState(104);

  return (
    <div className={clsx('page-layout-wrapper', className)} style={{ paddingTop }}>
      <Header onHeaderHeightUpdate={setPaddingTop} />
      <Container className='page-layout-container' maxWidth='lg'>
        {children}
      </Container>
      <Footer />
    </div>
  );
}