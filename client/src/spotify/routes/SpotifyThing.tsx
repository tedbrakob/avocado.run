import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "@spotify/routes/Login";
import Dashboard from "@src/spotify/routes/dashboard/view";
import Callback from "@spotify/routes/Callback";

export default function SpotifyThing() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={
          <Login />
        } />
        <Route path="/callback" element={
          <Callback />
        } />
        <Route path="/dashboard" element={
          <Dashboard />
        } />
        <Route path="*" element={
          <Navigate to='login'/>
        } />
      </Routes>
      <Outlet></Outlet>
    </div>
  );
};