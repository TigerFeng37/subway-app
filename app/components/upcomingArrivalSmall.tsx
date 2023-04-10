import Bullet from './bullet';
import styles from '../styles/styles';

import React from 'react';
import { Text, VStack, Box } from 'native-base';

interface Props {
    train: string;
    time: string;
    fewArrivals: boolean;
    outdated: boolean;
  }

const UpcomingArrivalSmall: React.FC<Props> = ({ train, time, fewArrivals, outdated }) => {

  return (
    <VStack rounded="lg" alignItems="center" mr={fewArrivals ? '3.5' : '0'}>
      <Bullet style={ styles[train] }  padding={true}/>
      { outdated ? 
        <Box bgColor="coolGray.300" rounded="sm" w="8" h="3.5" mx={1} mt={1.5} mb={0.5}/>
        :
        <Text mt={1}>
            { time }
        </Text>
      }
    </VStack>
  );
};
export default UpcomingArrivalSmall;