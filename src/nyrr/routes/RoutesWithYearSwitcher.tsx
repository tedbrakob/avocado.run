import { Outlet, Route, Routes, useSearchParams } from "react-router-dom";
import DivisionsResults from "./DivisionsResults";
import YearSwitcher from "../components/YearSwitcher";
import DivisionDetails from "./DivisionDetails";
import TeamDetails from "./TeamDetails";

export default function RoutesWithYearSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleYearChange(year: string) {
    setSearchParams({ year });
  }
  const year = parseInt(searchParams.get('year') ?? (new Date()).getFullYear().toString());

  return (
    <div className="w-full">
      <YearSwitcher
        year={year}
        setYear={handleYearChange}
      />

      <div className="p-2 max-w-fit m-auto">
        <Routes>
          <Route index element={
            <DivisionsResults
              year={year}
            />
          } />
          <Route path="division/:divisionCode" element={
            <DivisionDetails
              year={year}
            />
          } />
          <Route path="team/:teamCode" element={
            <div className="p-2 max-w-fit m-auto">
              <TeamDetails
                year={year}
              />
            </div>
          } />
        </Routes>


        <Outlet></Outlet>
      </div>
    </div>
  );
};