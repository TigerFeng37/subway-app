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
  }

const UpcomingArrivalSmall: React.FC<Props> = ({ train, time }) => {
  return (
    <View className="rounded-lg flex flex-col py-1 px-2 my-1 items-center">
      <Bullet letter={ styles[train].letter } color={styles[train].bgColor}/>
      <Text className="mt-1">
          { time }
      </Text>
    </View>
  );
};
export default UpcomingArrivalSmall;