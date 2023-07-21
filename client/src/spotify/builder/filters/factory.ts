import Filter from '@src/spotify/types/FilterComponent';
import Tempo from './tempo';
import TrackFilter from './trackFilterInterface';

const map = new Map([
  ['tempo', Tempo],
]);

export default function factory(filter: Filter):TrackFilter {
  const filterClass = map.get(filter.type);

  if (filterClass === undefined) {
    throw Error("Filter could not be resolved");
  }

  return new filterClass(filter.params);
}