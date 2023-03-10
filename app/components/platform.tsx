import UpcomingArrivalSmall from './upcomingArrivalSmall';
import UpcomingArrivalLarge from './upcomingArrivalLarge';
import PlatformType from '../../types/Platform';

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

interface Props {
  data: PlatformType;
  isExpanded: boolean;
  onShow: () => void;
}

const Platform: React.FC<Props> = ({ data, isExpanded, onShow }) => {
  return (
    <TouchableOpacity onPress={onShow} disabled={isExpanded} activeOpacity={0.8}>
      <TouchableWithoutFeedback disabled={!isExpanded} >
        <View className="bg-white shadow-sm rounded-lg flex flex-col py-1 px-3 my-1.5">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-xl mb-2">
                  { data.heading }
              </Text>
            </View>
            { isExpanded ? 
              <View className="flex flex-col gap-2">
                {data.departures.slice(0, 10).map((prop, key) => 
                  <UpcomingArrivalLarge
                    key={prop.key}
                    train={prop.train}
                    time={prop.time}
                    destination={prop.destination}
                  />
                )}
              </View>
            : 
              <View className="flex flex-row gap-2 justify-between">
                {data.departures.slice(0, 5).map((prop, key) =>
                  <UpcomingArrivalSmall
                    key={prop.key}
                    train={prop.train}
                    time={prop.time}
                  />
                )}
              </View>
            }
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
};
export default Platform;