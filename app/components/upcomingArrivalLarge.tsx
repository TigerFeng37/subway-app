import Bullet from './bullet';
import styles from '../styles/styles';

import React, {useState} from 'react';
import { View, Text } from 'react-native';

interface Props {
    train: string;
    time: string;
    destination?: string;
  }

const UpcomingArrivalLarge: React.FC<Props> = ({ train, time, destination }) => {
  return (
    <View className="w-full flex flex-row py-1 pl-2 my-1 justify-between items-center">
        <View className="flex-initial flex-wrap flex-row items-center justify-start">
            <Bullet style={ styles[train] } />
            <Text style={{flex: 1, flexWrap: 'wrap'}} className="ml-2.5 mb-.5 font-medium text-base">
                { destination ? destination : "" }
            </Text>
        </View>
        <Text className="mb-.5 text-base">
            { time }
        </Text>
    </View>
  );
};
export default UpcomingArrivalLarge;