import { Outlet, Route, Routes } from "react-router-dom";
import DivisionsResults from "../components/nyrr/DivisionsResults";
import DivisionDetails from "./nyrr/DivisionDetails";

export default function NyrrThing () {
  return (
    <div className="p-2 max-w-fit m-auto">

      <Routes>
        <Route index element={<DivisionsResults />} />
        <Route path="division/:divisionCode" element={<DivisionDetails />} />
      </Routes>

      <Outlet></Outlet>
    </div>
  );
};