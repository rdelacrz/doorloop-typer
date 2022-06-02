import { FunctionComponent } from 'react';
import clsx from 'clsx';

import './footer.scss';

interface FooterProps {
  className?: string;
}

export const Footer: FunctionComponent<FooterProps> = ({
  className,
}) => {
  return (
    <footer className={clsx('Footer-wrapper', className)}>
      Footer
    </footer>
  );
}

export default Footer;