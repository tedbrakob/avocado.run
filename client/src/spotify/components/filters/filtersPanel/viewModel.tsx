import FilterSummary from '@src/spotify/types/FilterSummary';
import Tempo from '../Tempo';
import { FilterParams } from '@src/spotify/types/filterParams';

type Props = {
  filters: Map<string, FilterSummary>,
  setFilters: React.Dispatch<React.SetStateAction<Map<string, FilterSummary>>>,
};

export default function viewModel (props: Props) {
  function generateFilterKey(): string {
    return Math.random().toString(36).slice(2, 5);
  }

  function addFilter(type: string, params?: FilterParams): void {
    const filterTypeTemplates: Map<string, FilterParams> = new Map([
      ['tempo', {minTempo: '', maxTempo: ''}],
    ]);

    params ??= filterTypeTemplates.get(type);

    if (params === undefined) {
      throw Error("Filter type template not found");
    }

    const key = generateFilterKey();
    props.setFilters(new Map(props.filters.set(key, {type, params})));
  }

  function resolveFilter(key: string, filter: FilterSummary): JSX.Element {
    const filterTypeComponents: Map<string, (props: any) => JSX.Element> = new Map([
      ['tempo', Tempo],
    ]);

    const component = filterTypeComponents.get(filter.type);

    if (component === undefined) {
      throw Error("Filter could not be resolved");
    }

    const filterProps = {
      params: filter.params,
      setParams: (params: FilterParams) => updateFilter(key, {
        type: filter.type,
        params,
      }),
    }

    return component(filterProps);
  }

  function resolvedFilters(): JSX.Element[] {
    return Array.from(props.filters).map(([key, filter]) => {
      return (
        <div
          key={key}
        >
          {resolveFilter(key, filter)}
        </div>
      )
    });
  }

  function updateFilter(key: string, filterSummary: FilterSummary) {
    props.setFilters(new Map(props.filters.set(key, filterSummary)));
  }

  return {
    resolvedFilters,
    addFilter
  };
}