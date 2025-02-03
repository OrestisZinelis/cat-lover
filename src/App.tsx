import { useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CssBaseline, Snackbar, Alert } from "@mui/material";
import Cats from "@pages/Cats";
import Breeds from "@pages/Breeds";
import BreedModal from "@src/components/BreedModal";
import Favorites from "@pages/Favorites";
import CatModal from "@src/components/CatModal";
import AppTopBar from "@layouts/AppTopBar";
import type { Page } from "@src/types/Page.types";

const pages: Page[] = [
  { title: "Cats", path: "/" },
  { title: "Breeds", path: "/breeds" },
  { title: "Favorites", path: "/favorites" },
];

export default function App() {
  const [alert, setAlert] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const showAlert = useMemo(
    () => (message: string, severity: "success" | "error") => {
      setAlert({ open: true, message, severity });
    },
    [setAlert],
  );

  return (
    <CssBaseline>
      <Router>
        <div className="min-h-screen bg-pink-100">
          <AppTopBar pages={pages} />
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="/cats" replace />} />
              <Route path="/cats" element={<Cats />}>
                <Route
                  path=":catId"
                  element={<CatModal showAlert={showAlert} />}
                />
              </Route>
              <Route path="/breeds" element={<Breeds />}>
                <Route
                  path=":breedId"
                  element={<BreedModal showAlert={showAlert} />}
                >
                  <Route
                    path="cats/:catId"
                    element={<CatModal showAlert={showAlert} />}
                  />
                </Route>
              </Route>
              <Route
                path="/favorites"
                element={<Favorites showAlert={showAlert} />}
              >
                <Route
                  path=":catId"
                  element={<CatModal showAlert={showAlert} />}
                />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert
          severity={alert.severity}
          onClose={() => setAlert({ ...alert, open: false })}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </CssBaseline>
  );
}
