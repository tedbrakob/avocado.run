import { Outlet, Route, Routes, useSearchParams } from "react-router-dom";
import DivisionsIndex from "./divisions/Index";
import YearSwitcher from "../components/YearSwitcher";
import DivisionDetails from "./divisions/Details";
import TeamDivisionIndex from "./teams/divisions/Index";
import TeamDivisionDetails from "./teams/divisions/Details";
import TeamsIndex from "./teams/Index";
import TeamDetails from "./teams/Details";
import RacesIndex from "./races/Index";
import RacesDetails from "./races/Details";

export default function NyrrThing() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleYearChange(year: string) {
    setSearchParams({ year });
  }
  const year = parseInt(searchParams.get('year') ?? (new Date()).getFullYear().toString());

  return (
    <div>
      <Routes>
        <Route path="*" element={
          <div className="w-full">
            <div className="w-full">
              <Routes>
                <Route path="races">
                  <Route index element={
                    <div>
                      <YearSwitcher
                        year={year}
                        setYear={handleYearChange}
                        allYears={true}
                      />
                      <RacesIndex
                        year={year}
                      />
                    </div>
                  } />
                  <Route path=":eventCode" element={
                    <div>
                      <YearSwitcher
                        year={year}
                        setYear={handleYearChange}
                      />
                      <RacesDetails />
                    </div>
                  } />
                </Route>

                <Route path="divisions">
                  <Route index element={
                    <div>
                      <YearSwitcher
                        year={year}
                        setYear={handleYearChange}
                      />
                      <DivisionsIndex
                        year={year}
                      />
                    </div>
                  } />
                  <Route path=":divisionCode" element={
                    <div>
                      <YearSwitcher
                        year={year}
                        setYear={handleYearChange}
                      />
                      <DivisionDetails
                        year={year}
                      />
                    </div>
                  } />
                </Route>

                <Route path="teams">
                  <Route index element={
                    <div>
                      <YearSwitcher
                        year={year}
                        setYear={handleYearChange}
                      />
                      <TeamsIndex
                        year={year}
                      />
                    </div>
                  } />
                  <Route path=":teamCode">
                    <Route index element={
                      <div>
                        <YearSwitcher
                          year={year}
                          setYear={handleYearChange}
                        />
                        <TeamDetails
                          year={year}
                        ></TeamDetails>
                      </div>
                    } />

                    <Route path="divisions">
                      <Route index element={
                        <div>
                          <YearSwitcher
                            year={year}
                            setYear={handleYearChange}
                          />
                          <TeamDivisionIndex
                            year={year}
                          />
                        </div>
                      } />
                    </Route>
                    <Route path="divisions/:divisionCode" element={
                      <div>
                        <YearSwitcher
                          year={year}
                          setYear={handleYearChange}
                        />
                        <TeamDivisionDetails
                          year={year}
                        />
                      </div>
                    } />
                    {/* team/division/race */}
                    {/* team/race */}
                  </Route>
                </Route>
              </Routes>
              <Outlet></Outlet>
            </div>
          </div>
        } />
      </Routes>
      <Outlet></Outlet>  
    </div>
  );
};