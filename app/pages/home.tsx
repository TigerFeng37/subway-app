import Platform from '../components/platform';
import SimpleStation from '../components/simpleStation';
import { StationApi } from '../api/station';
import LocationType from '../../types/Location';
import styles from '../styles/styles';
import Distance from '../components/distance';
import StationListType from '../../types/StationList';

import React, { useState, useEffect } from 'react';
import { StatusBar, RefreshControl, Dimensions, NativeSyntheticEvent, NativeScrollEvent, Vibration } from 'react-native';
import { View, Text, ScrollView, Box, HStack, VStack, Container, Pressable, Spacer } from 'native-base';
import { getDistance } from 'geolib';
import GetLocation from 'react-native-get-location';
import Modal from 'react-native-modal';
import AnimatedArrow from '../components/animatedArrow';
import Animated, { useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import InfoModal from '../components/InfoModal';

const Index = () => {

  const [expandedPlatform, setExpandedPlatform] = useState("");
  const [stationList, setStationList] = useState<StationListType>();
  const [detailedStationId, setDetailedStationId] = useState("");
  const [outsideRegion, setOutsideRegion] = useState(false);
  const [location, setLocation] = useState<LocationType>();
  const [lastLocationFetch, setLastLocationFetch] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('bg-white');
  
  const screenHeight = Dimensions.get('window').height;
    
  // update all data from backend
  async function fetchStations(currLocation?: LocationType) {

    if (!currLocation) currLocation = await getCurrentPosition();

    if (currLocation) {
      setLocation(currLocation);
      try {
        const result = await StationApi.get(currLocation);
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
              setBackgroundColor(styles[train].accentBgColor);
            }
          }
        };
      } catch (e) {
        console.log(e);
      }
    }
    setRefreshing(false);
  };

  // get the users current position and return a LocationType on success
  const getCurrentPosition = async () => {
    const now = Date.now();
    // only get new location if it's been more than three seconds
    if (now - lastLocationFetch > 3000) {
      let currLocation;
      try {
        currLocation = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
        });
        return { latitude: currLocation.latitude, longitude: currLocation.longitude };
      } catch (e) {
        console.warn(e);
      } finally {
        setLastLocationFetch(Date.now())
      }
    }
  }

  // calculate the change in user position since the last refresh,
  // if greater than 50 meters, fetch new station data
  const calculatePositionChange = async () => {
    
    let timeout = 1200;
    let currLocation = await getCurrentPosition();
    if (currLocation) {
      timeout = 0;
      if (!location) {
        fetchStations(currLocation);
        return;
      }
      const change = getDistance(location, currLocation);
      //traveling 20 mph -> 89 meters in 10 seconds. Set our limit as 50 meters
      if (change > 50) {
        fetchStations(currLocation);
        return;
      }
    }

    // otherwise, fake the refresh
    if (!expandedPlatform && stationList !== undefined && stationList.keys !== undefined) {
      setDetailedStationId(stationList.keys[0].stationId);
      const train = stationList.data[stationList.keys[0].stationId].trains.find(Boolean);
      if (train !== undefined) {
        setBackgroundColor(styles[train].accentBgColor);
      }
    }
    setTimeout(() => {
      setRefreshing(false);
    }, timeout)
  }
  
  // for pull down
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    calculatePositionChange();    
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

  // for pulling up
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const scrollEndThreshold = .15*layoutMeasurement.height;
    const currentScrollPosition = contentOffset.y;
    setScrollPosition(currentScrollPosition);
  
    if (expandedPlatform === "" && currentScrollPosition > scrollEndThreshold) {
      setModalVisible(true);
      Vibration.vibrate([0]);
    }
  };

  return (
    <>
      <StatusBar barStyle='dark-content'/> 
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={{ margin: 0 }}
        hasBackdrop={false}
      >
        <InfoModal setModalVisible={setModalVisible} />
      </Modal>
    <Box backgroundColor={backgroundColor} >
      { expandedPlatform === "" && 
        <View position="absolute" bottom={10} w="full">
          <HStack justifyContent="center">
            <AnimatedArrow scrollPosition={scrollPosition} />
          </HStack>
        </View>
      }
      {/* <ScrollView contentInsetAdjustmentBehavior="automatic" h="100%" scrollEnabled={false} > */}
        {outsideRegion ?
          <View h="100%" w="100%" px={8} justifyContent="center">
            <VStack w="full" space-between={2} mx="auto" mb={16} alignItems="center" py={3} bg="gray.200" rounded="xl" shadow={3}>
              <Text fontSize="xl">
                You are too far from the city!
              </Text>
              <Text fontSize="md" pb={3}>
                (Come back we miss you)
              </Text>
            </VStack>
          </View>
        :
        <>
        <Pressable h="100%" onPress={() => setExpandedPlatform("")} disabled={(expandedPlatform === "")}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={50}
            refreshControl={
              <RefreshControl
                progressViewOffset={54}
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="black"
              />
            }
          >
            <VStack px={8} flex={1} justifyContent="center">
              {(stationList !== undefined && detailedStationId !== undefined && stationList.data[detailedStationId] !== undefined) ?
                <VStack w="full" rounded="xl" bgColor="trueGray.100" shadow={3} pt={1.5} pb={3} px={4} >
                  <HStack flexWrap="wrap" justifyContent="space-between" alignItems="center" >
                    {stationList.data[detailedStationId] !== undefined &&
                      <>
                        <Text fontWeight="medium" fontSize="xl" flex={1} flexWrap='wrap'>
                          {stationList.data[detailedStationId].name}
                        </Text>
                        <Distance distance = {stationList.data[detailedStationId].distance} />
                      </>
                    }
                  </HStack>
                  {stationList.data[detailedStationId].platforms.length === 0 ? 
                    <Text mt={2} fontSize="lg">No upcoming trains</Text>
                    :
                    Object.keys(stationList.data[detailedStationId].platforms).map( (key, index) =>
                      (expandedPlatform !== key && expandedPlatform !== "") ? null :
                        <Platform
                            key = {stationList.data[detailedStationId].platforms[key].heading}
                            data = {stationList.data[detailedStationId].platforms[key]}
                            isExpanded = {expandedPlatform === key}
                            onShow = {() => setExpandedPlatform(key)}
                            screenHeight = {screenHeight}
                        />
                      )
                  }
                </VStack>
              :
                <View rounded="xl" bgColor="trueGray.100" shadow={3} w="full" pt={1.5} pb={3} px={4} minH="33%">
                </View>
              }
              {(stationList !== undefined && detailedStationId !== undefined && stationList.keys !== undefined) ?
                <>
                  {expandedPlatform === "" &&
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
                                  setBackgroundColor(styles[train].accentBgColor);
                                }
                              }}
                          />
                        }
                      })}
                    </>
                  }
                </>
                : 
                <View rounded="xl" bgColor="trueGray.100" minH="10%" shadow={3} w="full" pt={1.5} pb={3} px={4} mt={6}></View>
              } 
            </VStack>
          </ScrollView>
        </Pressable>
      </>}
      {/* </ScrollView> */}
    </Box>
  </>
  )
};

export default Index;