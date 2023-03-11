import { Outlet, Route, Routes } from "react-router-dom";
import Login from "./Login";
import LoginCallback from "./LoginCallback";

export default function SpotifyThing() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={
          <Login></Login>
        } />
        <Route path="/callback" element={
          <LoginCallback/>
        } />
        <Route path="*" element={
          <div>index</div>
        } />
      </Routes>
      <Outlet></Outlet>
    </div>
  );
};