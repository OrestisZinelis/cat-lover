export type AlertHandler = Readonly<{
  showAlert: (message: string, severity: "success" | "error") => void;
}>;
