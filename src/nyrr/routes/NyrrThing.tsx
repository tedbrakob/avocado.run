import { Outlet, Route, Routes } from "react-router-dom";
import RoutesWithYearSwitcher from "./RoutesWithYearSwitcher";

export default function NyrrThing () {
  return (
    <div>
      <Routes>
        <Route path="*" element={
          <RoutesWithYearSwitcher />
        } />
      </Routes>
      <Outlet></Outlet>  
    </div>
  );
};