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
    <View className={`bg-${color} rounded-full w-8 h-8`}>
        <Text className="font-medium text-white text-2xl my-auto text-center">
            { letter }
        </Text>
    </View>
  )
};
export default UpcomingArrival;