import StationType from '../../types/Station';

import GetLocation from 'react-native-get-location';
import { Dimensions } from 'react-native';

export const StationApi = {
    get: async function () {

      const largeScreen = (Dimensions.get('window').height > 825).toString();
        
      let location = null;
      try {
        location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
        });
      } catch (e) {
        console.warn(e);
        try {
          location = await GetLocation.getCurrentPosition({
            enableHighAccuracy: false,
            timeout: 3000,
          });
        } catch (e2) {
          console.warn(e2);
          return null;
        }
      }
      const { latitude, longitude } = location;

      const apiUrl = '143.244.163.173';
      const baseUrl = apiUrl + '/api/stations';

      //staten island
      //const [latitude, longitude] = [40.629863, -74.082427];

      //const [latitude, longitude] = [40.755261, -74.002016];

      //hungry ghost
      // const latitude = 40.685999;
      // const longitude = -73.973529;

      //crown heights
      // const latitude = 40.672277;
      // const longitude = -73.9576139;

      //grand central
      // const latitude = 40.7521678;
      // const longitude = -73.9763401;

      //299 putnam
      // const latitude = 40.684220;
      // const longitude = -73.949817;

      //hoyt schermerhorn
      // const latitude = 40.6888286;
      // const longitude = -73.985126;

      //Jay st metrotech
      // const latitude = 40.692265;
      // const longitude = -73.9864207;

      //Bergen st
      // const latitude = 40.6854157;
      // const longitude = -73.9915024;

      //Church Av
      // const latitude = 40.6437108;
      // const longitude = -73.9796123;

      //jackson heights
      // const latitude = 40.746657;
      // const longitude = -73.890488;

      //woodside
      // const latitude = 40.745531;
      // const longitude = -73.902948;

      //tremont ave
      // const latitude = 40.850276;
      // const longitude = -73.905297;

      try {
          const response = await fetch(`http://${baseUrl}?latitude=${latitude}&longitude=${longitude}&largeScreen=${largeScreen}`, {
              method: "GET",
              headers: { 'Content-Type': 'application/json' },
          });

          if (response.status >= 300 || response.status < 200) {
              throw new Error(
                  `Error submitting GET on /station endpoint with status code ${response.status} and message `
              );
          }
          
          const data = await response.json();

          //todo: check length of response

          let result: Record<string, StationType> = {};

          for (const el of data.data) {
              result[el.id] = el; 
          }

          return result;

      } catch (e) {
          console.log(e);
          return null;
      }
    }
}