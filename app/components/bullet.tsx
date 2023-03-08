import styles from '../styles/styles';
import StyleType from '../../types/Style';

import React, {useState} from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

interface Props {
    style: StyleType;
}

const UpcomingArrival: React.FC<Props> = ({ style }) => {
  return (
    <View className="w-8">
      {style.diamond ? 
        <View className="py-[2px] ml-.5">
          <View className={`${style.bgColor} relative rotate-45 w-[24px] h-[24px]`}>
            <View className="absolute -rotate-45">
              <Text className=" ml-2 font-medium text-white text-xl  text-center">
                { style.letter }
              </Text>
            </View>
          </View>
        </View>
      :
        <View className={`${style.bgColor} rounded-full w-7 h-7`}>
          <Text className="font-medium text-white text-xl my-auto text-center">
            { style.letter }
          </Text>
        </View>
      }
    </View>)
};
export default UpcomingArrival;