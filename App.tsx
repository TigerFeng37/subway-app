import React, {createContext, useContext, useState} from 'react';
import { NativeBaseProvider, Text } from 'native-base';

import Index from './app/pages/home';
import theme from './theme';
import {UpdatedContext} from './app/contexts/UpdatedContext';

function App(): JSX.Element {

  const [updated, setUpdated] = useState<number>(0);
  //const updatedContextInitial = useContext(UpdatedContext);
  const updatedContext= { updated, setUpdated };

  return (
    <NativeBaseProvider theme={theme}>
      <UpdatedContext.Provider value={updatedContext}>
        <Index />
      </UpdatedContext.Provider>
    </NativeBaseProvider>
  );
}

export default App;
