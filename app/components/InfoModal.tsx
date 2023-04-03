import React, { Dispatch, SetStateAction } from "react";
import { BlurView } from "expo-blur";
import { Linking } from "react-native";
import { Pressable, View, Image, Text, VStack, HStack } from "native-base";

import twitter from '../../images/icons/twitter.png';
import linkedin from '../../images/icons/linkedin.png';
import github from '../../images/icons/github.png';
import upArrow from '../../images/icons/up_arrow.png';


interface Props {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const InfoModal: React.FC<Props> = ({setModalVisible}) => {
  return (
    <BlurView intensity={70} tint="light">
      <VStack w="full" h="full">
        <Pressable onPress={() => setModalVisible(false)}>
          <View h="66%"></View>
        </Pressable>
      
        <View w="full" h="full" px={5} pt={3} alignItems="center" space-y={1} borderTopLeftRadius={20} borderTopRightRadius={20} style={{ backgroundColor: 'rgba(255, 255, 255, .9)'}}>
          <View bgColor="gray.400" h={1} w={10} rounded="full" mb={7}>
          </View>
          <Pressable onPress={() => Linking.openURL('https://portfolio.cwest144.com')}>
            <VStack alignItems="center" space-y={1}>
            <Text fontSize="xs">designed and developed by</Text>
            <HStack space={2}>
              <Text fontSize="2xl">Chris West</Text>
              <Image source={upArrow} mt={2} w={3} h={3} alt="icon indicating that the text is a link"/>
            </HStack>
            </VStack>
          </Pressable>
          <HStack space={5} pt={6} alignItems="center">
            <Pressable onPress={() => Linking.openURL('https://twitter.com/cwest144')}>
              <Image source={twitter} w={7} h={7} alt="twitter logo"/>
            </Pressable>
            <Pressable onPress={() => Linking.openURL('https://www.linkedin.com/in/chriswest144/')}>
              <Image source={linkedin} w={8} h={8} alt="linkedin logo"/>
            </Pressable>
            <Pressable onPress={() => Linking.openURL('https://github.com/cwest144')}>
              <Image source={github} w={7} h={7} alt="github logo"/>
            </Pressable>
          </HStack>
        </View>
      </VStack>
    </BlurView>
  )
}

export default InfoModal;