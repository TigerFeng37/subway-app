import styles from '../styles/styles';
import StyleType from '../../types/Style';
import greenExpress from '../../images/express-bullets/green.png';
import orangeExpress from '../../images/express-bullets/orange.png';
import purpleExpress from '../../images/express-bullets/purple.png';

import React from 'react';
import { View, Text, Image } from 'native-base';

interface Props {
    style: StyleType;
    padding: boolean
}

const Bullet: React.FC<Props> = ({ style, padding }) => {

  const getExpressBullet = (color: string) => {
    switch (color){
      case 'mtaGreen': return greenExpress;
      case 'mtaPurple': return purpleExpress;
      case 'mtaOrange': return orangeExpress;
      default: greenExpress;
    }
  } 

  if (style.diamond) {
    return (
      <>
        <Image source={getExpressBullet(style.bgColor)} w={9} h={9} alt="express bullet"/>
        <Text fontWeight="medium" color="white" fontSize="xl" my="auto" style={{ textAlign: "center"}} position="absolute" ml={3} pt={1}>
          { style.letter }
        </Text>
      </>
    )
  }

  return (
    <View bgColor={style.bgColor} rounded="full" w={8} h={8} my={padding ? '0.5' : '0'} mx={padding ? '0.5' : '0'}>
      <Text fontWeight="medium" color="white" fontSize="xl" my="auto" style={{ textAlign: "center"}}>
        { style.letter }
      </Text>
    </View>
  )
};
export default Bullet;