import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/components/app';

import '~/styles/global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
