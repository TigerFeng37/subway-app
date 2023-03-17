import StationType from './Station';

export default interface StationListType {
  keys: Array<{stationId: string, distance: number}>,
  data: Record<string, StationType>
}