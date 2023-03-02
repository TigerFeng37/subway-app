import styles from '../styles/styles';

import React, {useState} from 'react';
import {
  View,
  Text
} from 'react-native';

interface Props {
    letter: string;
    color: string;
}

const UpcomingArrival: React.FC<Props> = ({ letter, color }) => {
  return (
    <View className={`${color} rounded-full w-7 h-7`}>
        <Text className="font-medium text-white text-xl my-auto text-center">
            { letter }
        </Text>
    </View>
  )
};
export default UpcomingArrival;