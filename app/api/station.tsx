import StationType from '../../types/Station';
import StationListType from '../../types/StationList';

export const StationApi = {
    get: async function () {
        const url = "http://127.0.0.1:8000/api/departures/A41";
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status >= 300 || response.status < 200) {
                throw new Error(
                    `Error submitting GET on /station endpoint with status code ${response.status} and message `
                );
            }
            
            const data = await response.json();
            let d = data.data as StationType;

            return d;
        } catch (e) {
            console.log(e);
            return null;
        }
    },

    closest: async function () {
        const baseUrl = "http://127.0.0.1:8000/api/stations";
        
        //crown heights
        // const latitude = 40.672277;
        // const longitude = -73.9576139;

        //grand central
        const latitude = 40.7521678;
        const longitude = -73.9763401;

        try {
            const response = await fetch(`${baseUrl}?latitude=${latitude}&longitude=${longitude}`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status >= 300 || response.status < 200) {
                throw new Error(
                    `Error submitting GET on /station endpoint with status code ${response.status} and message `
                );
            }
            
            const data = await response.json();

            //console.log(data.data);

            //todo: check length of response

            let result: Record<string, StationType> = {};

            for (const el of data.data) {
                result[el.id] = el; 
            }

            // const d = {
            //     data.data[0]: data.data[0],
            //     next: data.data[1],
            // } as Record<>;

            //d.sort((a, b) => a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0);

            console.log(result);

            //return null;

            return result;

        } catch (e) {
            console.log(e);
            return null;
        }
    }
}