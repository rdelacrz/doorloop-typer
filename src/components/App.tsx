import { useState } from 'react';
import { PageLayout } from '~/components/layouts';

import logo from '~/assets/logo.svg';

import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <PageLayout>
      Child content
    </PageLayout>
  )
}

export default App
