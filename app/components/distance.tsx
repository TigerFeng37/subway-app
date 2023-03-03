import styles from '../styles/styles';

import React, {useState} from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

interface Props {
    distance: number;
}

const Distance: React.FC<Props> = ({ distance }) => {
    if (distance === 0) {
        return <Image
            className='w-4 h-5'
            source={require('../../images/here.png')}
        />
    }
    const distanceStr = distance.toString().replace(/^0+/, '') + ' mi';
    return <Text className="text-lg">
        {distanceStr}
    </Text>
};
export default Distance ;