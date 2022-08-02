import ReactDOM from "react-dom/client";
import { 
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import App from "./App";
import PaceCalculator from "./routes/pace-calculator.tsx";
import StravaThing from "./routes/strava-thing";
import SpotifyThing from "./routes/spotify-thing";
import './index.css'

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/pace-calculator" />} />
      <Route path="/" element={<App />}>
        <Route 
          path="pace-calculator" 
          element={<PaceCalculator />}
        />
        {/* <Route 
          path="strava-thing" 
          element={<StravaThing />} 
        />
        <Route 
          path="spotify-thing" 
          element={<SpotifyThing />}
        /> */}
      </Route>
    </Routes>
  </BrowserRouter>
);