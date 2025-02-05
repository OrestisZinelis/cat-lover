import { useMemo, useState, useCallback } from "react";
import type { FC, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";
import AlertContext from "@contexts/AlertContext";

export const AlertProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const showAlert = useCallback(
    (message: string, severity: "success" | "error") => {
      setAlert({ open: true, message, severity });
    },
    [],
  );

  const value = useMemo(() => ({ showAlert }), [showAlert]);

  return (
    <AlertContext.Provider value={value}>
      {children}

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
    </AlertContext.Provider>
  );
};
