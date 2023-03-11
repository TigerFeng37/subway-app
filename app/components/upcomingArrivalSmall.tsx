import Bullet from './bullet';
import styles from '../styles/styles';

import React, {useState} from 'react';
import {
  View,
  Text
} from 'react-native';

interface Props {
    train: string;
    time: string;
    fewArrivals: boolean;
  }

const UpcomingArrivalSmall: React.FC<Props> = ({ train, time, fewArrivals }) => {
  return (
    <View className={`rounded-lg flex flex-col items-center ${fewArrivals ? 'mr-3' : ''}`}>
      <Bullet style={ styles[train] } />
      <Text className="mt-1">
          { time }
      </Text>
    </View>
  );
};
export default UpcomingArrivalSmall;