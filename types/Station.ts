import PlatformType from './Platform';

export default interface StationType {
    name: string;
    distance: string;
    platforms: Record<string, PlatformType>;
}