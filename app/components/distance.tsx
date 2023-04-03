import styles from '../styles/styles';

import React, {useState} from 'react';
import { Text, Image } from 'native-base';

interface Props {
    distance: number;
}

const Distance: React.FC<Props> = ({ distance }) => {
    if (distance === 0 || distance === 0.05) {
      return <Image
        w={4} h={5}
        source={require('../../images/here.png')}
        alt="here logo"
      />
    }
    const distanceStr = distance.toString().replace(/^0+/, '') + ' mi';
    return <Text fontSize="lg">
      {distanceStr}
    </Text>
};
export default Distance ;