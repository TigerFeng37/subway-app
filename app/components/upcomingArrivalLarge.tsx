import Bullet from './bullet';
import styles from '../styles/styles';

import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

interface Props {
    train: string;
    time: string;
    destination?: string;
  }

const UpcomingArrivalLarge: React.FC<Props> = ({ train, time, destination }) => {
  return (
    <ScrollView>
      <View className="w-full flex flex-row py-1 pl-2 my-1 justify-between items-center">
          <View className="flex flex-row items-center justify-start">
              <Bullet letter={ styles[train].letter } color={styles[train].bgColor} />
              <Text className="ml-2 mb-.5 font-medium">
                  { destination ? destination : "" }
              </Text>
          </View>
          <Text className="mb-.5">
              { time }
          </Text>
          
      </View>
    </ScrollView>
  );
};
export default UpcomingArrivalLarge;