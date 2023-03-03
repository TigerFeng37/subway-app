/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Index from './app/pages/index';

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {

  const [backgroundColor, setBackgroundColor] = useState('bg-white');

  const updateBackgroundColor = (color: string) => {
    setBackgroundColor(color);
  };

  return (
    <SafeAreaView className = {`${backgroundColor}`}>
      <Index updateBackgroundColor={updateBackgroundColor} />
    </SafeAreaView>
  );
}

export default App;
