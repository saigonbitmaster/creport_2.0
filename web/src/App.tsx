import * as React from "react";
import { Admin, CustomRoutes, Resource } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import { Route } from "react-router";

import { authProvider } from "ra-nest-rest";
import { Login, Layout } from "./layout";
import { Dashboard } from "./dashboard";
import englishMessages from "./i18n/en";
import { lightTheme } from "./layout/themes";

import Configuration from "./configuration/Configuration";
import dataProvider from "ra-nest-rest";
import proposers from "./proposer";
import kpis from "./kpi";
import funds from "./fund";
import challenges from "./challenge";
import FetchGithub from "./tools/fetchGithub";
import FetchCardano from "./tools/fetchCardano";
import proposals from "./proposal";
import commits from "./commit";

const loginUrl = "http://localhost:3000/auth/login";
const apiUrl = "http://localhost:3000";

const restProvider = dataProvider(apiUrl);
const i18nProvider = polyglotI18nProvider((locale) => {
  if (locale === "fr") {
    return import("./i18n/fr").then((messages) => messages.default);
  }
  // Always fallback on english
  return englishMessages;
}, "en");

const _authProvider = authProvider(loginUrl);
const App = () => {
  return (
    <Admin
      title="cReport"
      dataProvider={restProvider}
      dashboard={Dashboard}
      loginPage={Login}
      layout={Layout}
      i18nProvider={i18nProvider}
      disableTelemetry
      theme={lightTheme}
    >
      <CustomRoutes>
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/fetchCardano" element={<FetchCardano />} />
        <Route path="/fetchGithub" element={<FetchGithub />} />
      </CustomRoutes>
      <Resource name="proposers" {...proposers} />
      <Resource name="funds" {...funds} />
      <Resource name="challenges" {...challenges} />
      <Resource name="proposals" {...proposals} />
      <Resource name="kpis" {...kpis} />
      <Resource name="commits" {...commits} />
    </Admin>
  );
};

export default App;
