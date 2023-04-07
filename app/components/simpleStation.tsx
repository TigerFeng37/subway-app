import Bullet from './bullet';
import styles from '../styles/styles';
import Distance from './distance';

import React from 'react';
import { View, Text, Pressable, VStack, HStack } from 'native-base';

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
    <Pressable onPress={onShow} w="full">
      <VStack rounded="xl" bgColor={bgColor} shadow={3} w="full" pt={2} pb={3} px={4} mt={screenHeight > 900 ? '6' : '4'}>
          <HStack w="full" justifyContent="space-between" alignItems="center">
              <Text fontWeight="medium" fontSize="xl" lineHeight={20} ml={0.5} flexWrap="wrap" > 
                  { name }
              </Text>
              <Distance distance = {distance} />
          </HStack>
          <HStack pt={1} flexWrap="wrap" space-between-y={3}>
            {trains.map((train) => 
              <View key={train} mr={2}>
                <Bullet style={styles[train]} padding={false}/>
              </View>
            )}
          </HStack>
      </VStack>
    </Pressable>
  );
};
export default SimpleStation;