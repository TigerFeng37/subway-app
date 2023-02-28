import Bullet from './bullet';

import React, {useState} from 'react';
import {
  View,
  Text
} from 'react-native';

interface Props {
    train: string;
    time: string;
  }

const UpcomingArrival: React.FC<Props> = ({ train, time }) => {
  return (
    <View className="bg-white rounded-lg flex flex-col py-1 px-2 my-1 items-center">
        <Bullet letter={ train } color="mta-blue" />
        <Text className="mt-1">
            { time }
        </Text>
    </View>
  );
};
export default UpcomingArrival;