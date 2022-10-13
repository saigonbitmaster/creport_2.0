import * as React from "react";
import { Admin, CustomRoutes, Resource } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import { Route } from "react-router";

import { authProvider } from "ra-nest-rest";
import { Login, Layout } from "./layout";
import { Dashboard } from "./dashboard";
import englishMessages from "./i18n/en";
import { lightTheme } from "./layout/themes";

import members from "./members";
import reviews from "./reviews";
import Configuration from "./configuration/Configuration";
import Segments from "./segments/Segments";
import quizSets from "./quizSets";
import quizzes from "./quizzes";
import dataProvider from "ra-nest-rest";
import payouts from "./payout";

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

const App = () => {
  return (
    <Admin
      title="title"
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
        <Route path="/segments" element={<Segments />} />
      </CustomRoutes>
      <Resource name="members" {...members} />

      <Resource name="reviews" {...reviews} />
      <Resource name="quizSets" {...quizSets} />
      <Resource name="quizzes" {...quizzes} />
      <Resource name="payouts" {...payouts} />
    </Admin>
  );
};

export default App;
