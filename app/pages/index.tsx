import Platform from '../components/platform';

import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
const Index = () => {
  return (
    <>
    <StatusBar
        barStyle='light-content'
        backgroundColor='black'
      />
    <ScrollView contentInsetAdjustmentBehavior="automatic">
    {/* <Header /> */}
    <View className="h-screen w-screen px-8 bg-blue-100 flex flex-col items-center justify-center">
        <View className="rounded-xl bg-stone-100 w-full pt-1.5 pb-3 px-3 flex flex-col">
            <View className="flex flex-row w-full justify-between items-center">
                <Text className="font-medium text-2xl">
                    Nostrand Av
                </Text>
                <Text className="text-lg">
                    .25 mi
                </Text>
            </View>
            <Platform name="Manhattan"/>
            <Platform name="Queens"/>
        </View>
    </View>
    </ScrollView>
    </>
  );
};
export default Index;