import {Outlet, Route, Routes, useSearchParams } from "react-router-dom";
import DivisionsIndex from "./DivisionsIndex";
import YearSwitcher from "../components/YearSwitcher";
import DivisionDetails from "./DivisionDetails";
import TeamDetails from "./TeamDetails";
import TeamDivisionDetails from "./TeamDivisionDetails";
import TeamsIndex from "./TeamsIndex";

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
          <Route path="divisions">
            <Route index element={
              <DivisionsIndex
                year={year}
              />
            } />
            <Route path=":divisionCode" element={
              <DivisionDetails
                year={year}
              />
            }/>
          </Route>

          <Route path="teams">
            <Route path=":teamCode">
              <Route index element={
                <TeamDetails
                  year={year}
                />
              } />
              <Route path="divisions/:divisionCode" element={
                <TeamDivisionDetails
                  year={year}
                />
              } />
              {/* team/division/race */}
              {/* team/race */}
            </Route>
            <Route index element={
              <TeamsIndex
                year={year}
              />
            }/>
          </Route>
        </Routes>
        <Outlet></Outlet>
      </div>
    </div>
  );
};