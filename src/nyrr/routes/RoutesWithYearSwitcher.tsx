import { Navigate, Outlet, Route, Routes, useSearchParams } from "react-router-dom";
import DivisionsResults from "./DivisionsResults";
import YearSwitcher from "../components/YearSwitcher";
import DivisionDetails from "./DivisionDetails";
import TeamDetails from "./TeamDetails";
import TeamDivisionDetails from "./TeamDivisionDetails";

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

      <div className="w-full">
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
          {/* division/race */}
          <Route path="team">
            <Route path=":teamCode">
              <Route index element={
                <TeamDetails
                  year={year}
                />
              } />
              <Route path="division/:divisionCode" element={
                <TeamDivisionDetails
                  year={year}
                />
              } />
              {/* team/division/race */}
              {/* team/race */}
            </Route>
            <Route index element={<Navigate to="/nyrr-thing" />}/>
          </Route>
        </Routes>
        <Outlet></Outlet>
      </div>
    </div>
  );
};