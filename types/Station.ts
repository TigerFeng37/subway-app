import PlatformType from './Platform';

export default interface StationType {
    id: string;
    name: string;
    trains: Array<string>;
    distance: string;
    platforms: Record<string, PlatformType>;
}