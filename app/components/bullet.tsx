import styles from '../styles/styles';
import StyleType from '../../types/Style';
import greenExpress from '../../images/express-bullets/green.png';
import orangeExpress from '../../images/express-bullets/orange.png';
import purpleExpress from '../../images/express-bullets/purple.png';

import React from 'react';
import { View, Text, Image } from 'react-native';

interface Props {
    style: StyleType;
    padding: boolean
}

const Bullet: React.FC<Props> = ({ style, padding }) => {

  const getExpressBullet = (color: string) => {
    switch (color){
      case 'bg-mta-green': return greenExpress;
      case 'bg-mta-purple': return purpleExpress;
      case 'bg-mta-orange': return orangeExpress;
      default: greenExpress;
    }
  } 

  if (style.diamond) {
    return (
      <>
        <Image source={getExpressBullet(style.bgColor)} className="w-9 h-9"/>
        <Text className="font-medium text-white text-xl my-auto text-center absolute ml-3 pt-1">
          { style.letter }
        </Text>
      </>
    )
  }

  return (
    <View className={`${style.bgColor} rounded-full w-8 h-8 ${padding ? 'my-0.5 mx-0.5' : ''}`}>
      <Text className="font-medium text-white text-xl my-auto text-center">
        { style.letter }
      </Text>
    </View>
  )
};
export default Bullet;