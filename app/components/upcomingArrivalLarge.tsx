import Bullet from './bullet';
import styles from '../styles/styles';

import React from 'react';
import { View, Text, HStack, Box } from 'native-base';

interface Props {
    train: string;
    time: string;
    destination?: string;
    outdated: boolean;
  }

const UpcomingArrivalLarge: React.FC<Props> = ({ train, time, destination, outdated }) => {
  return (
    <HStack py={0.5} my={0.5} justifyContent="space-between" alignItems="center">
        <HStack flex={1} alignItems="center" justifyContent="flex-start" >
            <Bullet style={ styles[train] } padding={true}/>
            {destination &&
              <Text flexWrap='wrap' lineHeight={17} flex={1} ml={2.5} mb={0.5} fontWeight="medium">
                  {destination}
              </Text>
            }
        </HStack>
        { outdated ? 
          <Box bgColor="coolGray.300" rounded="sm" w="10" h="3.5" mx={1} mt={1.5} mb={0.5}/>
          :
          <Text ml={0.5} mb={0.5}>
              { time }
          </Text>          
        }
    </HStack>
  );
};
export default UpcomingArrivalLarge;