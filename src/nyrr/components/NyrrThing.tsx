import { Outlet, Route, Routes } from "react-router-dom";
import RoutesWithYearSwitcher from "./RoutesWithYearSwitcher";
import TeamDetails from "./TeamDetails";

export default function NyrrThing () {
  return (
    <div>

      <Routes>
        <Route path="team/:teamCode" element={
          <div className="p-2 max-w-fit m-auto"><TeamDetails /></div>
        } />
        <Route path="*" element={
          <RoutesWithYearSwitcher />
        } />
      </Routes>


        <Outlet></Outlet>  
    </div>
  );
};