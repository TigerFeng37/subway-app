import Platform from '../components/platform';
import SimpleStation from '../components/simpleStation';

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
    {/* <StatusBar
        barStyle='light-content'
        backgroundColor="mta-blue"
        hidden={true}
    /> */}
    <ScrollView contentInsetAdjustmentBehavior="automatic" scrollEnabled={false} >
        {/* <Header /> */}
        <View className="h-screen w-screen px-8 bg-blue-100 justify-center">
            <View className="flex flex-col items-center mb-32">
                <View className="rounded-xl bg-stone-100 w-full pt-1.5 pb-3 px-4 flex flex-col">
                    <View className="flex flex-row w-full justify-between items-center">
                        <Text className="font-medium text-xl">
                            Nostrand Ave
                        </Text>
                        <Text className="text-lg">
                            .25 mi
                        </Text>
                    </View>
                    <Platform name="Manhattan"/>
                    <Platform name="Queens"/>
                </View>
                <SimpleStation name="Bedford-Nostrand Avs" distance=".35 mi" trains="G"/>
            </View>
        </View>
    </ScrollView>
    </>
  );
};
export default Index;