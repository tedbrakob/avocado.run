import { Outlet, Route, Routes } from "react-router-dom";
import Login from "@spotify/routes/Login";
import Dashboard from "@spotify/routes/Dashboard";

export default function SpotifyThing() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={
          <Login></Login>
        } />
        <Route path="/dashboard" element={
          <Dashboard/>
        } />
        <Route path="*" element={
          <div>index</div>
        } />
      </Routes>
      <Outlet></Outlet>
    </div>
  );
};