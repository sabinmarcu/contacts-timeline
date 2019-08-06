import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { ApolloProvider } from 'react-apollo-hooks';

import { Navigation } from '@ct/layout';
import ContactsList from './components/contacts';
import { client } from './graphql';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Navigation style={{flex: 0}} />
        <ContactsList />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
