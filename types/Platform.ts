export default interface PlatformType {
        heading: string;
        departures: Array<{
            train: string;
            time: string;
            destination?: string
        }>;
}