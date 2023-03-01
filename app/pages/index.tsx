import Platform from '../components/platform';
import SimpleStation from '../components/simpleStation';
import { StationApi } from '../api/station';
import StationType from '../../types/Station';

import React, {useState, useEffect} from 'react';
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

    const dummyStation: StationType = {
        name: "Nostrand Ave",
        distance: ".25 mi",
        platforms: {
            "Manhattan": {
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
            "Queens": {
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
        }
    };

    const [stationData, setStationData] = useState<StationType>(dummyStation);
    const [expandedPlatform, setExpandedPlatform] = useState("");

    async function fetchData() {
        try {
            const result = await StationApi.get();
            if (result !== undefined && result !== null) {
                console.log(result.platforms);
                setStationData(result);
            };
        } catch (e) {
            console.log(e);
        }
    };


    // refresh data every minute
    const MINUTE_MS = 60000;
    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, MINUTE_MS);
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

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
            {stationData.platforms !== undefined ? 
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
                        {Object.keys(stationData.platforms).map( (key, index) =>
                                <Platform
                                    data = {stationData.platforms[key]}
                                    isExpanded = {expandedPlatform === key}
                                    onShow = {() => setExpandedPlatform(key)}
                                    onHide = {() => setExpandedPlatform("")}
                                />
                            )
                        }
                    </View>
                    {expandedPlatform === "" ? <SimpleStation name="Bedford-Nostrand Avs" distance=".35 mi" trains="G"/> : null}
                </View>
            : null
            }
        </View>
    </ScrollView>
    </>
  );
};
export default Index;