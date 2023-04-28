import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import PaceCalculator from "./pace-calculator/components/pace-calculator";
import StravaThing from "./routes/strava-thing";
import SpotifyThing from "./spotify/routes/SpotifyThing";
import NyrrThing from "./nyrr/routes/NyrrThing";

// serviceWorkerRegistration.register();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="pace-calculator" />} />
        <Route path="/" element={<App />}>
          <Route
            path="pace-calculator"
            element={<PaceCalculator />}
          />
          <Route
            path="strava-thing"
            element={<StravaThing />}
          />
          <Route
            path="spotify-thing/*"
            element={<SpotifyThing />}
          />
          <Route
            path="nyrr-thing/*"
            element={<NyrrThing />}
          >
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);