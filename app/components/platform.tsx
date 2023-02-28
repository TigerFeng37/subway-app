import React, {useState} from 'react';
import {
  View,
  Text
} from 'react-native';

interface Props {
    name: string;
  }

const Platform: React.FC<Props> = ({ name }) => {
  return (
    <View className="bg-white rounded-lg flex flex-col py-1 px-2 my-1">
        <Text className="text-xl mb-1">
            { name }
        </Text>
        <View className="flex flex-row gap-2 mb-1">
            <Text className="text-sm">
                3 min
            </Text>
            <Text className="text-sm">
                8 min
            </Text>
        </View>
    </View>
  );
};
export default Platform;