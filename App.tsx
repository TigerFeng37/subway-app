import React from 'react';
import { NativeBaseProvider, Text } from 'native-base';

import Index from './app/pages/home';
import theme from './theme';

function App(): JSX.Element {
  return (
    <NativeBaseProvider theme={theme}>
      {/* <Text>
        Hi
      </Text> */}
      <Index />
    </NativeBaseProvider>
  );
}

export default App;
