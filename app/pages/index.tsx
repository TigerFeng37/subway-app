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
  Animated,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import StationListType from '../../types/StationList';

interface Props {
  updateBackgroundColor: (str: string) => void;
}

const Content: React.FC<Props> = ({ updateBackgroundColor }) => {

  const [expandedPlatform, setExpandedPlatform] = useState("");
  const [stationList, setStationList] = useState<StationListType>();
  const [detailedStationId, setDetailedStationId] = useState("");
  const [outsideRegion, setOutsideRegion] = useState(false);
  const screenHeight = Dimensions.get('window').height;
    
  async function fetchStations() {
    try {
      const result = await StationApi.get();
        if (result !== undefined && result !== null) {

          const stationDistances = Object.keys(result).map( (key, index) => {
            return {stationId: key, distance: result[key].distance}
          });
          stationDistances.sort((a, b) => a.distance - b.distance);
          setStationList({keys: stationDistances, data: result});

          // order the stations by distance and set which station is expanded
          if (!Object.keys(result).includes(detailedStationId)) {  
            setDetailedStationId(stationDistances[0].stationId);

            if (stationDistances[0].distance > 25) {
              setOutsideRegion(true);
              return;
            }
            setOutsideRegion(false);

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

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    if (!expandedPlatform && stationList !== undefined && stationList.keys !== undefined) {
      setDetailedStationId(stationList.keys[0].stationId);
      const train = stationList.data[stationList.keys[0].stationId].trains.find(Boolean);
      if (train !== undefined) {
        updateBackgroundColor(styles[train].accentBgColor);
      }
    }

    setTimeout(() => {
      setRefreshing(false);
    }, 800);
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
    <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <TouchableOpacity onPress={() => setExpandedPlatform("")} disabled={(expandedPlatform === "")} activeOpacity={0.8}>
        <View className={`h-screen w-screen px-8 justify-center`}>
          <View className={`flex flex-col items-center ${screenHeight < 750 ? 'mb-6' : 'mb-20'}`}>
            {(stationList !== undefined && detailedStationId !== undefined && stationList.data[detailedStationId] !== undefined) ?
              <View className="rounded-xl bg-stone-100 shadow w-full pt-1.5 pb-3 px-4 flex flex-col">
                <View className="flex flex-row flex-wrap w-full justify-between items-center" >
                  {stationList.data[detailedStationId] !== undefined ? 
                    <>
                      <Text className="font-medium text-xl" style={{flex: 1, flexWrap: 'wrap'}}>
                        {stationList.data[detailedStationId].name}
                      </Text>
                      <Distance distance = {stationList.data[detailedStationId].distance} />
                    </>
                    : null
                  }
                </View>
                {Object.keys(stationList.data[detailedStationId].platforms).map( (key, index) =>
                  (expandedPlatform !== key && expandedPlatform !== "") ?  null :
                    <Platform
                        key = {stationList.data[detailedStationId].platforms[key].heading}
                        data = {stationList.data[detailedStationId].platforms[key]}
                        isExpanded = {expandedPlatform === key}
                        onShow = {() => setExpandedPlatform(key)}
                        screenHeight = {screenHeight}
                    />
                  )
                }
              </View>
            :
              <View className="rounded-xl bg-stone-100 shadow w-full pt-1.5 pb-3 px-4 flex flex-col min-h-1/3">
              </View>
            }
            {(stationList !== undefined && detailedStationId !== undefined && stationList.keys !== undefined) ?
              <>
                {expandedPlatform === "" ? 
                  <>
                    {stationList.keys.map( (key, index) => {
                      if (key.stationId !== detailedStationId) {
                        const thisStation = stationList.data[key.stationId];
                        return <SimpleStation
                            key = {thisStation.name + thisStation.trains[0]}
                            name = {thisStation.name}
                            distance = {thisStation.distance}
                            trains = {thisStation.trains}
                            screenHeight = {screenHeight}
                            onShow = {() => {
                              setDetailedStationId(thisStation.id);
                              const train = thisStation.trains.find(Boolean);
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
    </ScrollView>
  }
  </>)
};

const Index: React.FC<Props> = ({ updateBackgroundColor }) => {
  return (
    <>
    <StatusBar barStyle='dark-content'/> 
      <ScrollView contentInsetAdjustmentBehavior="automatic" scrollEnabled={false} >
        <Content updateBackgroundColor = {updateBackgroundColor} />
      </ScrollView>
    </>
  );
};
export default Index;