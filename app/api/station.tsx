import StationType from '../../types/Station';

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

        //299 putnam
        // const latitude = 40.684220;
        // const longitude = -73.949817;

        //hoyt schermerhorn
        //const latitude = 40.6888286;
        //const longitude = -73.985126;

        //Jay st metrotech
        // const latitude = 40.692265;
        // const longitude = -73.9864207;

        //Bergen st
        // const latitude = 40.6854157;
        // const longitude = -73.9915024;

        //Church Av
        // const latitude = 40.6437108;
        // const longitude = -73.9796123;

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