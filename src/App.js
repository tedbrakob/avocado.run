import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

import './App.css';

export default function App() {
  return (
    <div className="bg-light h-full font-nunito text-base leading-tight">
      <NavBar/>
      <div className="pt-5">
        <Outlet />
      </div>
    </div>
  );
};