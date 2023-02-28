/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

 import Index from './app/pages/index';

import React from 'react';
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
  return (
    <SafeAreaView className="bg-white">
      <Index />
    </SafeAreaView>
  );
}

export default App;
