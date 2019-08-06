import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';

import {
  Navigation,
  ThemeProvider,
  useThemeProvider,
  ThemeSwitcher,
} from '@ct/layout';
import { client } from './graphql';

import { ContactsRoute } from './routes/home';

function App() {
  const context = useThemeProvider();
  return (
    <ThemeProvider value={context}>
      <ApolloProvider client={client}>
        <Navigation style={{ flex: 0 }} right={<ThemeSwitcher />} />
        <ContactsRoute />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
