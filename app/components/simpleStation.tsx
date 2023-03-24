import Bullet from './bullet';
import styles from '../styles/styles';
import Distance from './distance';

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
    name: string;
    distance: number;
    trains: Array<string>;
    onShow: () => void;
    screenHeight: number;
  }

const SimpleStation: React.FC<Props> = ({ name, distance, trains, onShow, screenHeight }) => {

  const first = trains.find(Boolean);
  const bgColor = first !== undefined ? styles[first].darkAccentBgColor : 'bg-white';

  return (
    <TouchableOpacity onPress={onShow} className="w-full" activeOpacity={0.8}>
      <View className={`rounded-xl ${bgColor} shadow w-full pt-1.5 pb-3 px-4 flex flex-col ${screenHeight > 900 ? 'mt-6' : 'mt-4'}`}>
          <View className="flex flex-row w-full justify-between items-center">
              <Text className="font-medium text-xl leading-6 ml-0.5" style={{flex: 1, flexWrap: 'wrap'}}>
                  { name }
              </Text>
              <Distance distance = {distance} />
          </View>
          <View className="pt-1 flex flex-row flex-wrap gap-y-3">
            {trains.map((train) => 
              <View key={train} className="mr-2">
                <Bullet style={styles[train]} />
              </View>
            )}
          </View>
      </View>
    </TouchableOpacity>
  );
};
export default SimpleStation;