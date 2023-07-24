import FilterSummary from "@src/spotify/types/FilterSummary"
import viewModel from "./viewModel";

type Props = {
  filters: Map<string, FilterSummary>,
  setFilters: React.Dispatch<React.SetStateAction<Map<string, FilterSummary>>>,
};

export default function FiltersPanel(props: Props) {
  const {
    resolvedFilters
  } = viewModel(props);

  return (
    <div
      className="bg-light p-2 m-1"
    >
      <div className="text-l font-bold m-auto max-w-fit">
        Filters
      </div>

      {
        resolvedFilters()
      }
    </div>
  );
}