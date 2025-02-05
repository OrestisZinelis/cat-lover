import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AlertProvider } from "@contexts/AlertProvider";
import Cats from "@pages/Cats";
import Breeds from "@pages/Breeds";
import BreedModal from "@src/components/BreedModal";
import Favorites from "@pages/Favorites";
import CatModal from "@src/components/CatModal";
import AppTopBar from "@layouts/AppTopBar";
import type { Page } from "@src/types/Page.types";
import { CssBaseline } from "@mui/material";

const pages: Page[] = [
  { title: "Cats", path: "/" },
  { title: "Breeds", path: "/breeds" },
  { title: "Favorites", path: "/favorites" },
];

export default function App() {
  return (
    <CssBaseline>
      <AlertProvider>
        <Router>
          <div className="min-h-screen bg-pink-100">
            <AppTopBar pages={pages} />
            <div>
              <Routes>
                <Route path="/" element={<Navigate to="/cats" replace />} />
                <Route path="/cats" element={<Cats />}>
                  <Route path=":catId" element={<CatModal />} />
                </Route>
                <Route path="/breeds" element={<Breeds />}>
                  <Route path=":breedId" element={<BreedModal />}>
                    <Route path="cats/:catId" element={<CatModal />} />
                  </Route>
                </Route>
                <Route path="/favorites" element={<Favorites />}>
                  <Route path=":catId" element={<CatModal />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AlertProvider>
    </CssBaseline>
  );
}
