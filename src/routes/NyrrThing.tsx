import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import DivisionsResults from "../components/nyrr/DivisionsResults";
import YearSwitcher from "../nyrr/components/YearSwitcher";
import DivisionDetails from "./nyrr/DivisionDetails";

export default function NyrrThing () {
  return (
    <div className="w-full">
      <YearSwitcher />

      <div className="p-2 max-w-fit m-auto">
        <Routes>
          <Route index element={<Navigate to="2022" />} />
          <Route path="/:year">
            <Route index element={<DivisionsResults />} />
            <Route path="division/:divisionCode" element={<DivisionDetails />} />
          </Route>
        </Routes>

        <Outlet></Outlet>
      </div>
      
    </div>
  );
};