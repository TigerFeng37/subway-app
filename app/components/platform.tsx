import UpcomingArrivalSmall from './upcomingArrivalSmall';
import UpcomingArrivalLarge from './upcomingArrivalLarge';
import PlatformType from '../../types/Platform';

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

interface Props {
    data: PlatformType;
    isExpanded: boolean;
    onShow: () => void;
    onHide: () => void;
  }

const Platform: React.FC<Props> = ({ data, isExpanded, onShow, onHide }) => {
  return (
    <TouchableOpacity onPress={onShow}>
      <View className="bg-white rounded-lg flex flex-col py-1 px-3 my-1.5">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-xl mb-1">
                { data.heading }
            </Text>
            {isExpanded ? 
              <TouchableOpacity onPress={onHide}>
                <View className="w-6 h-6 rounded-full bg-gray-300"></View>
              </TouchableOpacity>
            : null }
          </View>
          
          { isExpanded ? 
            <View className="flex flex-col gap-2 mt-1">
              {data.departures.slice(0, 8).map((prop, key) => {
                return (
                  <UpcomingArrivalLarge train={prop.train} time={prop.time} destination={prop.destination} />
                );
              })}
            </View>
          : 
            <View className="flex flex-row gap-2">
              {data.departures.slice(0, 5).map((prop, key) => {
                return (
                  <UpcomingArrivalSmall train={prop.train} time={prop.time} />
                );
              })}
            </View>
          }
      </View>
    </TouchableOpacity>
  );
};
export default Platform;