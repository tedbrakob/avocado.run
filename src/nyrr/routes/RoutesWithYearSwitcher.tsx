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
          <Route path="team">
            <Route path=":teamCode">
              <Route index element={
                <div className="p-2 max-w-fit m-auto">
                  <TeamDetails
                    year={year}
                  />
                </div>
              } />
              <Route path="division/:divisionCode" element={
                <div className="p-2 max-w-fit m-auto">
                  <TeamDivisionDetails
                    year={year}
                  />
                </div>
              } />
            </Route>
            <Route index element={<Navigate to="/nyrr-thing" />}/>
          </Route>
        </Routes>


        <Outlet></Outlet>
      </div>
    </div>
  );
};