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

            //console.log(response.status);
            
            const data = await response.json();

            //console.log(data);
            // 
            //var d = new StationType();
            let d = data.data as StationType;
            //console.log(d.platforms);
            return d;
        } catch (e) {
            console.log(e);
            return null;
        }
        // return {
        //     name: "Jay Street",
        //     distance: ".25 mi",
        //     platforms: [
        //         {
        //             heading: "Manhattan",
        //             departures: [
        //                 {
        //                     train: "A",
        //                     time: "3 min"
        //                 },
        //                 {
        //                     train: "C",
        //                     time: "6 min"
        //                 },
        //                 {
        //                     train: "A",
        //                     time: "11 min"
        //                 },
        //                 {
        //                     train: "C",
        //                     time: "19 min"
        //                 }
        //             ]
        //         },
        //         {
        //             heading: "Queens",
        //             departures: [
        //                 {
        //                     train: "C",
        //                     time: "3 min"
        //                 },
        //                 {
        //                     train: "C",
        //                     time: "8 min"
        //                 },
        //                 {
        //                     train: "A",
        //                     time: "11 min"
        //                 },
        //                 {
        //                     train: "C",
        //                     time: "19 min"
        //                 }
        //             ]
        //         }
        //     ]
        // } as StationType;
    }
}