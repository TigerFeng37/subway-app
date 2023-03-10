import Platform from '../components/platform';
import SimpleStation from '../components/simpleStation';
import { StationApi } from '../api/station';
import StationType from '../../types/Station';
import styles from '../styles/styles';
import Loading from '../components/loading';
import Distance from '../components/distance';

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

interface Props {
  updateBackgroundColor: (str: string) => void;
}

const Content: React.FC<Props> = ({ updateBackgroundColor }) => {

  const [expandedPlatform, setExpandedPlatform] = useState("");
  const [stationList, setStationList] = useState<Record<string, StationType>>();
  const [detailedStationId, setDetailedStationId] = useState("");
  const [outsideRegion, setOutsideRegion] = useState(false);
    
  async function fetchStations() {
    try {
      const result = await StationApi.get();
        if (result !== undefined && result !== null) {
          setStationList(result);

          // order the stations by distance and set which station is expanded
          if (!Object.keys(result).includes(detailedStationId)) {

            const stationDistances = Object.keys(result).map( (key, index) => {
              return {stationId: key, distance: result[key].distance}
            });
            stationDistances.sort((a, b) => a.distance - b.distance);      
            setDetailedStationId(stationDistances[0].stationId);

            if (stationDistances[0].distance > 25) {
              setOutsideRegion(true);
              return;
            }

            setExpandedPlatform("");

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

  // refresh data every 30 seconds
  const REFRESH_MS = 30000;
  useEffect(() => {
    fetchStations();
    const interval = setInterval(() => {
      fetchStations();
    }, REFRESH_MS);
    return () => clearInterval(interval) // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [detailedStationId])

  return (
    <>
    {outsideRegion ?
      <View className={`h-screen w-screen px-8 justify-center`}>
        <View className="flex flex-col w-full gap-2 mx-auto mb-16 items-center py-3 bg-gray-200 rounded-xl shadow">
          <Text className="text-xl">
            You are too far from the city!
          </Text>
          <Text className="text-md pb-3">
            (Come back we miss you)
          </Text>
        </View>
      </View>
    :
    <TouchableOpacity onPress={() => setExpandedPlatform("")} disabled={(expandedPlatform === "")} activeOpacity={0.8}>
    <View className={`h-screen w-screen px-8 justify-center`}>
      <View className="flex flex-col items-center mb-32">
        {(stationList !== undefined && detailedStationId !== undefined && stationList[detailedStationId] !== undefined) ?
          <View className="rounded-xl bg-stone-100 shadow w-full pt-1.5 pb-3 px-4 flex flex-col">
            <View className="flex flex-row w-full justify-between items-center">
              {stationList[detailedStationId] !== undefined ? 
                <>
                  <Text className="font-medium text-xl">
                    {stationList[detailedStationId].name}
                  </Text>
                  <Distance distance = {stationList[detailedStationId].distance} />
                </>
                : null
              }
            </View>
            {Object.keys(stationList[detailedStationId].platforms).map( (key, index) =>
              (expandedPlatform !== key && expandedPlatform !== "") ?  null :
                <Platform
                    key = {stationList[detailedStationId].platforms[key].heading}
                    data = {stationList[detailedStationId].platforms[key]}
                    isExpanded = {expandedPlatform === key}
                    onShow = {() => setExpandedPlatform(key)}
                />
              )
            }
          </View>
        :
          <View className="rounded-xl bg-stone-100 shadow w-full pt-1.5 pb-3 px-4 flex flex-col min-h-1/3">
          </View>
        }
        {(stationList !== undefined && detailedStationId !== undefined) ?
          <>
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
              : null
            }
          </>
          : 
          <View className="rounded-xl bg-stone-100 min-h-1/10 shadow w-full pt-1.5 pb-3 px-4 mt-6">
          </View>
        }
      </View>
    </View>
    </TouchableOpacity>
  }
  </>)
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