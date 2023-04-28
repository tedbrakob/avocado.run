import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setColorsAsCssVars } from "./static/colors";


const queryClient = new QueryClient();
setColorsAsCssVars();

export default function App() {
  return (
    <div className="h-full font-nunito text-base leading-tight">
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <Outlet />
      </QueryClientProvider>
    </div>
  );
};