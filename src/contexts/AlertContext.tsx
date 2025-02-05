import { createContext } from "react";

type AlertContextType = {
  showAlert: (message: string, severity: "success" | "error") => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export default AlertContext;
