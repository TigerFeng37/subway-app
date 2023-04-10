import StationType from '../../types/Station';

import GetLocation from 'react-native-get-location';
import { Dimensions } from 'react-native';
import LocationType from '../../types/Location';

export const StationApi = {
    get: async function (location: LocationType) {

      const largeScreen = (Dimensions.get('window').height > 825).toString();
      
      const {latitude, longitude} = location;

      const apiUrl = '143.244.163.173';
      const baseUrl = apiUrl + '/api/stations';     

      try {
          const response = await fetch(`http://${baseUrl}?latitude=${latitude}&longitude=${longitude}&largeScreen=${largeScreen}`, {
              method: "GET",
              headers: { 'Content-Type': 'application/json' },
          });

          if (response.status >= 300 || response.status < 200) {
            const responseBody = await response.text();
            throw new Error(
                `Error submitting GET on /station endpoint with status code ${response.status} and message ${responseBody}`
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