import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import { Navigation } from '@ct/layout';

function App() {
  return (
    <ThemeProvider><Navigation /></ThemeProvider>
  );
}

export default App;
