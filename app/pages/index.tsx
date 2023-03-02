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
import StationListType from '../../types/StationList';

const Content = () => {

    const [expandedPlatform, setExpandedPlatform] = useState("");

    const [stationList, setStationList] = useState<Record<string, StationType>>();

    const [detailedStationId, setDetailedStationId] = useState("");

    const [stationData, setStationData] = useState<StationType>();
    
    // async function fetchData() {
    //     if (stationList === undefined) return;
    //     try {
    //         const result = await StationApi.get();
    //         if (result !== undefined && result !== null) {
    //             console.log(result.platforms);

    //             let copy = stationList;
    //             copy["239"].platforms = result.platforms;
    //             //stationList["239"].platforms = result.platforms;

    //             //console.log(stationList["239"].platforms);
    //             setStationList(copy);
    //             //setStationData(result);
    //         };
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    async function fetchStations() {
        try {
            const result = await StationApi.closest();
            if (result !== undefined && result !== null) {
                console.log(Object.keys(result)[0]);
                setStationList(result);

                if (detailedStationId === "") {
                    setDetailedStationId(Object.keys(result)[0]);
                }
            };
        } catch (e) {
            console.log(e);
        }
    };

    // refresh data every minute
    const MINUTE_MS = 6000;
    useEffect(() => {
        fetchStations();
        //fetchData();

        const interval = setInterval(() => {
            //fetchData();
        }, MINUTE_MS);

        // const interval2 = setInterval(() => {
        //     fetchStations();
        // }, MINUTE_MS*2);

        return () => clearInterval(interval) // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

    return (
        <View className="h-screen w-screen px-8 bg-blue-100 justify-center">
            {(stationList !== undefined && detailedStationId !== "") ?
                <View className="flex flex-col items-center mb-32">
                    <View className="rounded-xl bg-stone-100 w-full pt-1.5 pb-3 px-4 flex flex-col">
                        <View className="flex flex-row w-full justify-between items-center">
                            <Text className="font-medium text-xl">
                                {stationList[detailedStationId].name}
                                {/* Fake Station Name */}
                            </Text>
                            <Text className="text-lg">
                                {stationList[detailedStationId].distance}
                            </Text>
                        </View>
                        { stationList[detailedStationId].platforms !== undefined ? 
                            <>
                                {Object.keys(stationList[detailedStationId].platforms).map( (key, index) =>
                                            <Platform
                                                data = {stationList[detailedStationId].platforms[key]}
                                                isExpanded = {expandedPlatform === key}
                                                onShow = {() => setExpandedPlatform(key)}
                                                onHide = {() => setExpandedPlatform("")}
                                            />
                                    )
                                }
                            </>
                        : null }
                    </View>
                    {expandedPlatform === "" ? 
                        <>
                            {Object.keys(stationList).map( (key, index) => {
                                if (key !== detailedStationId) {
                                    return <SimpleStation name={stationList[key].name} distance={stationList[key].distance} trains={stationList[key].trains} />
                                }
                            })}
                        </>
                        : null }
                {/* <SimpleStation name="Bedford-Nostrand Avs" distance=".35 mi" trains="G"/> : null} */}
                </View>
            : null
            }
        </View>
    )
};

const Index = () => {

    return (
    <>
    {/* <StatusBar
        barStyle='light-content'
        backgroundColor="mta-blue"
        hidden={true}
    /> */}

    <ScrollView contentInsetAdjustmentBehavior="automatic" scrollEnabled={false} >
        {/* <Header /> */}

        <Content />

    </ScrollView>
    </>
  );
};
export default Index;