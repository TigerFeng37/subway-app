export default interface PlatformType {
    heading: string;
    departures: Array<{
        key: string;
        train: string;
        time: string;
        destination?: string
    }>;
}