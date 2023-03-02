import Bullet from './bullet';
import styles from '../styles/styles';

import React, {useState} from 'react';
import {
  View,
  Text
} from 'react-native';

interface Props {
    name: string;
    distance: string;
    trains: Array<string>;
  }

const SimpleStation: React.FC<Props> = ({ name, distance, trains }) => {
  return (
    <View className="rounded-xl bg-green-100 w-full pt-1.5 pb-3 px-4 mt-6 flex flex-col">
        <View className="flex flex-row w-full justify-between items-center">
            <Text className="font-medium text-xl">
                { name }
            </Text>
            <Text className="text-lg">
                { distance }
            </Text>
        </View>
        <View className="pt-1 flex flex-row">
            {trains.map((train) => 
              <View className="mr-2">
                <Bullet letter={ styles[train].letter } color={styles[train].bgColor} />
              </View>
            )}
        </View>
    </View>
  );
};
export default SimpleStation;