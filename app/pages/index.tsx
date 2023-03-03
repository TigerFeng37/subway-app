import Platform from '../components/platform';
import SimpleStation from '../components/simpleStation';
import { StationApi } from '../api/station';
import StationType from '../../types/Station';
import styles from '../styles/styles';
import Loading from '../components/loading';

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  StatusBar,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Distance from '../components/distance';

interface Props {
  updateBackgroundColor: (str: string) => void;
}

const Content: React.FC<Props> = ({ updateBackgroundColor }) => {

  const [expandedPlatform, setExpandedPlatform] = useState("");
  const [stationList, setStationList] = useState<Record<string, StationType>>();
  const [detailedStationId, setDetailedStationId] = useState("");
    
  async function fetchStations() {
    try {
      const result = await StationApi.closest();
        if (result !== undefined && result !== null) {
          setStationList(result);

          //order the stations by distance and set which station is expanded
          if (detailedStationId === "" || !Object.keys(result).includes(detailedStationId)) {      
            const stationDistances = Object.keys(result).map( (key, index) => {
              return {stationId: key, distance: result[key].distance}
            });
            stationDistances.sort((a, b) => a.distance - b.distance);      
            setDetailedStationId(stationDistances[0].stationId);

            const train = result[stationDistances[0].stationId].trains.find(Boolean);
            if (train !== undefined) {
              updateBackgroundColor(styles[train].accentBgColor);
            }
          }
        };
    } catch (e) {
      console.log(e);
    }
  };

  // refresh data every minute
  const MINUTE_MS = 60000;
  useEffect(() => {
    fetchStations();

    const interval = setInterval(() => {
      fetchStations();
    }, MINUTE_MS);

    return () => clearInterval(interval) // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  return (
    <View className={`h-screen w-screen px-8 justify-center`}>
      <View className="flex flex-col items-center mb-32">
        {(stationList !== undefined && detailedStationId !== "") ?
          <>
            <View className="rounded-xl bg-stone-100 shadow w-full pt-1.5 pb-3 px-4 flex flex-col">
              <View className="flex flex-row w-full justify-between items-center">
                <Text className="font-medium text-xl">
                  {stationList[detailedStationId].name}
                </Text>
                <Distance distance = {stationList[detailedStationId].distance} />
              </View>
              { stationList[detailedStationId].platforms !== undefined ? 
                <>
                  {Object.keys(stationList[detailedStationId].platforms).map( (key, index) =>
                    (expandedPlatform !== key && expandedPlatform !== "") ?  null :
                      <Platform
                          key = {stationList[detailedStationId].platforms[key].heading}
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
                    return <SimpleStation
                        key = {stationList[key].name}
                        name = {stationList[key].name}
                        distance = {stationList[key].distance}
                        trains = {stationList[key].trains}
                        onShow = {() => {
                          setDetailedStationId(stationList[key].id);
                          const train = stationList[key].trains.find(Boolean);
                          if (train !== undefined) {
                            updateBackgroundColor(styles[train].accentBgColor);
                          }
                        }}
                    />
                  }
                })}
              </>
            : null }          
          </>
        :
          <Loading />
        }
      </View>
    </View>
  )
};

const Index: React.FC<Props> = ({ updateBackgroundColor }) => {
  return (
    <>
    {/* <StatusBar
        barStyle='light-content'
        backgroundColor="mta-blue"
        hidden={true}
    /> */}

    <ScrollView contentInsetAdjustmentBehavior="automatic" scrollEnabled={false} >
      {/* <Header /> */}

      <Content updateBackgroundColor = {updateBackgroundColor} />

    </ScrollView>
    </>
  );
};
export default Index;