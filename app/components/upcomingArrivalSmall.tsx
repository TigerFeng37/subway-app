import Bullet from './bullet';
import styles from '../styles/styles';

import React, {useState} from 'react';
import { Text, VStack } from 'native-base';

interface Props {
    train: string;
    time: string;
    fewArrivals: boolean;
  }

const UpcomingArrivalSmall: React.FC<Props> = ({ train, time, fewArrivals }) => {
  return (
    <VStack rounded="lg" alignItems="center" mr={fewArrivals ? '3.5' : '0'}>
      <Bullet style={ styles[train] }  padding={true}/>
      <Text mt={1}>
          { time }
      </Text>
    </VStack>
  );
};
export default UpcomingArrivalSmall;