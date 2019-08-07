import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import {
  Navigation,
  ThemeProvider,
  useThemeProvider,
  ThemeSwitcher,
} from '@ct/layout';
import { hot } from 'react-hot-loader';
import { client } from './graphql';

import { ContactsRoute } from './routes/home';

// eslint-disable-next-line import/no-mutable-exports
let App = () => {
  const context = useThemeProvider();
  return (
    <ThemeProvider value={context}>
      <ApolloProvider client={client}>
        <Navigation style={{ flex: 0 }} right={<ThemeSwitcher />} />
        <ContactsRoute />
      </ApolloProvider>
    </ThemeProvider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  App = hot(module)(App);
}

export default App;
