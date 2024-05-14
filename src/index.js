import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/router";
import "./i18n/i18n";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Toaster } from "react-hot-toast";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider, createTheme } from "@mantine/core";
import "dayjs/locale/tr";
import i18n from "./i18n/i18n";
import { I18nextProvider } from "react-i18next";
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <MantineProvider theme={createTheme({ colorScheme: "dark" })}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <I18nextProvider i18n={i18n}>
          <Router />
        </I18nextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </MantineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
