import Bullet from './bullet';

import React, {useState} from 'react';
import {
  View,
  Text
} from 'react-native';

interface Props {
    train: string;
    time: string;
    destination: string;
  }

const UpcomingArrivalSmall: React.FC<Props> = ({ train, time, destination }) => {
  return (
    <View className="bg-white w-full flex flex-row py-1 pl-2 my-1 justify-between items-center">
        <View className="flex flex-row items-center justify-start">
            <Bullet letter={ train } color="mta-blue" />
            <Text className="ml-2 mb-1 font-medium">
                { destination }
            </Text>
        </View>
        <Text className="mb-1">
            { time }
        </Text>
        
    </View>
  );
};
export default UpcomingArrivalSmall;