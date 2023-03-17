import UpcomingArrivalSmall from './upcomingArrivalSmall';
import UpcomingArrivalLarge from './upcomingArrivalLarge';
import PlatformType from '../../types/Platform';

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

interface Props {
  data: PlatformType;
  isExpanded: boolean;
  onShow: () => void;
  screenHeight: number;
}

const Platform: React.FC<Props> = ({ data, isExpanded, onShow, screenHeight}) => {

  const fewArrivals = (data.departures.length < 5);

  return (
    <TouchableOpacity onPress={onShow} disabled={isExpanded} activeOpacity={0.8}>
      <TouchableWithoutFeedback disabled={!isExpanded} >
        <View className={`bg-white shadow-sm rounded-lg flex flex-col pt-1 pb-2.5 px-3 ${screenHeight < 700 ? 'my-1' : 'my-1.5'}`}>
            <View className="flex flex-row justify-between items-center">
              <Text className={`text-xl ${screenHeight < 700 ? 'mb-1' : 'mb-2'}`}>
                  { data.heading }
              </Text>
            </View>
            { isExpanded ? 
              <View className="flex flex-col gap-2">
                {data.departures.slice(0, screenHeight < 825 ? 9 : 11).map((prop, key) => 
                  <UpcomingArrivalLarge
                    key={prop.key}
                    train={prop.train}
                    time={prop.time}
                    destination={prop.destination}
                  />
                )}
              </View>
            : 
              <View className={`w-full flex flex-row ${fewArrivals ? 'justify-start' : 'justify-between'}`}>
                {data.departures.slice(0, screenHeight > 900 ? 6 : 5).map((prop, key) =>
                  <UpcomingArrivalSmall
                    key={prop.key}
                    train={prop.train}
                    time={prop.time}
                    fewArrivals={fewArrivals}
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