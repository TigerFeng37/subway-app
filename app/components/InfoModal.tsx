import React, { Dispatch, SetStateAction } from "react";
import { BlurView } from "expo-blur"
import { Linking, Pressable, View, Image, Text } from "react-native"

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
      <View className="flex flex-col w-screen h-full">
        <Pressable onPress={() => setModalVisible(false)}>
          <View className="h-2/3"></View>
        </Pressable>
      
        <View className="w-screen h-full px-5 pt-3 items-center space-y-1" style={{ backgroundColor: 'rgba(255, 255, 255, .9)', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
          <View className="bg-gray-400 h-1 w-10 rounded-full mb-7">
          </View>
          <Pressable className="flex flex-col items-center space-y-1" onPress={() => Linking.openURL('https://portfolio.cwest144.com')}>
            <Text className="text-xs">designed and developed by</Text>
            <View className="flex flex-row space-x-2">
              <Text className="text-2xl">Chris West</Text>
              <Image source={upArrow} className="mt-2 w-3 h-3"/>
            </View>
          </Pressable>
          <View className="flex flex-row space-x-5 pt-6 items-center">
            <Pressable onPress={() => Linking.openURL('https://twitter.com/cwest144')}>
              <Image source={twitter} className="w-7 h-7"/>
            </Pressable>
            <Pressable onPress={() => Linking.openURL('https://www.linkedin.com/in/chriswest144/')}>
              <Image source={linkedin} className="w-8 h-8"/>
            </Pressable>
            <Pressable onPress={() => Linking.openURL('https://github.com/cwest144')}>
              <Image source={github} className="w-7 h-7"/>
            </Pressable>
          </View>
        </View>
      </View>
    </BlurView>
  )
}

export default InfoModal;