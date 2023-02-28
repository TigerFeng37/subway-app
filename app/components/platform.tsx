import UpcomingArrival from './upcomingArrival';

import React, {useState} from 'react';
import {
  View,
  Text
} from 'react-native';

interface Props {
    name: string;
  }

const Platform: React.FC<Props> = ({ name }) => {
  return (
    <View className="bg-white rounded-lg flex flex-col py-1 px-3 my-1.5">
        <Text className="text-xl mb-1">
            { name }
        </Text>
        <View className="flex flex-row gap-2">
            <UpcomingArrival train="A" time="3 min" />
            <UpcomingArrival train="A" time="8 min" />
            <UpcomingArrival train="A" time="17 min" />
        </View>
    </View>
  );
};
export default Platform;