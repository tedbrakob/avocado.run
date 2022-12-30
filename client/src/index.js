import ReactDOM from "react-dom/client";
import { 
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import App from "./App";
import PaceCalculator from "./pace-calculator/components/pace-calculator.tsx";
import StravaThing from "./routes/strava-thing";
import SpotifyThing from "./routes/spotify-thing";
import './index.css'
import NyrrThing from "./nyrr/routes/NyrrThing";

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
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
          path="spotify-thing" 
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
);