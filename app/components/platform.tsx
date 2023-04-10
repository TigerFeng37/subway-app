import UpcomingArrivalSmall from './upcomingArrivalSmall';
import UpcomingArrivalLarge from './upcomingArrivalLarge';
import PlatformType from '../../types/Platform';

import React from 'react';
import { View, Text, Pressable, HStack, VStack } from 'native-base';

interface Props {
  data: PlatformType;
  isExpanded: boolean;
  onShow: () => void;
  screenHeight: number;
  outdated: boolean;
}

const Platform: React.FC<Props> = ({ data, isExpanded, onShow, screenHeight, outdated}) => {

  if (data.departures.length === 0) return null;

  const fewArrivals = (data.departures.length < 5);

  return (
    <Pressable onPress={onShow} disabled={isExpanded}>
      <Pressable disabled={!isExpanded}>
        <VStack bgColor="white" shadow={1} rounded="lg" pt={1} pb={2} px={3} my={screenHeight < 700 ? '1' : '1.5'}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="xl" mb={screenHeight < 700 ? '1' : '1.5'}>
                  { data.heading }
              </Text>
            </HStack>
            { isExpanded ? 
              <VStack space={2}>
                {data.departures.slice(0, screenHeight < 825 ? 9 : 11).map((prop, key) => 
                  <UpcomingArrivalLarge
                    key={prop.key}
                    train={prop.train}
                    time={prop.time}
                    destination={prop.destination}
                    outdated={outdated}
                  />
                )}
              </VStack>
            : 
              <HStack justifyContent={fewArrivals ? 'flex-start' : 'space-between'}>
                {data.departures.slice(0, screenHeight > 900 ? 6 : 5).map((prop, key) =>
                  <UpcomingArrivalSmall
                    key={prop.key}
                    train={prop.train}
                    time={prop.time}
                    fewArrivals={fewArrivals}
                    outdated={outdated}
                  />
                )}
              </HStack>
            }
        </VStack>
      </Pressable>
    </Pressable>
  );
};
export default Platform;