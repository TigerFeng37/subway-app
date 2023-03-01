import Platform from '../components/platform';
import SimpleStation from '../components/simpleStation';

import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Index = () => {

    const stationData = {
        name: "Nostrand Ave",
        distance: ".25 mi",
        platforms: [
            {
                heading: "Manhattan",
                departures: [
                    {
                        train: "A",
                        time: "3 min"
                    },
                    {
                        train: "C",
                        time: "6 min"
                    },
                    {
                        train: "A",
                        time: "11 min"
                    },
                    {
                        train: "C",
                        time: "19 min"
                    }
                ]
            },
            {
                heading: "Queens",
                departures: [
                    {
                        train: "C",
                        time: "3 min"
                    },
                    {
                        train: "C",
                        time: "8 min"
                    },
                    {
                        train: "A",
                        time: "11 min"
                    },
                    {
                        train: "C",
                        time: "19 min"
                    }
                ]
            }
        ]
    }

    const [expandedPlatform, setExpandedPlatform] = useState("");

    return (
    <>
    {/* <StatusBar
        barStyle='light-content'
        backgroundColor="mta-blue"
        hidden={true}
    /> */}
    <ScrollView contentInsetAdjustmentBehavior="automatic" scrollEnabled={false} >
        {/* <Header /> */}
        <View className="h-screen w-screen px-8 bg-blue-100 justify-center">
            <View className="flex flex-col items-center mb-32">
                <View className="rounded-xl bg-stone-100 w-full pt-1.5 pb-3 px-4 flex flex-col">
                    <View className="flex flex-row w-full justify-between items-center">
                        <Text className="font-medium text-xl">
                            {stationData.name}
                        </Text>
                        <Text className="text-lg">
                            {stationData.distance}
                        </Text>
                    </View>
                    {stationData.platforms.map((prop) => {
                        return (
                            <Platform
                                data = {prop}
                                isExpanded = {expandedPlatform === prop.heading}
                                onShow = {() => setExpandedPlatform(prop.heading)}
                                onHide = {() => setExpandedPlatform("")}
                            />
                        );
                    })}
                </View>
                {expandedPlatform === "" ? <SimpleStation name="Bedford-Nostrand Avs" distance=".35 mi" trains="G"/> : null}
            </View>
        </View>
    </ScrollView>
    </>
  );
};
export default Index;