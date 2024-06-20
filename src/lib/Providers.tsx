"use client";

import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { theme } from "./Theme/Theme";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

export default Providers;
