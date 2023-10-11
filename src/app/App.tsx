import { Page } from "@dynatrace/strato-components-preview";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Data } from "./pages/Data";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";

import { FinancesPage } from "src/itcorpo/pages/finances/FinancesPage";
import { OfficesPage } from "src/itcorpo/pages/offices/OfficesPage";
import { ProjectsPage } from "src/itcorpo/pages/projects/ProjectsPage";
import { EmployeesPage } from "src/itcorpo/pages/employees/EmployeesPage";
import { BenefitsPage } from "src/itcorpo/pages/benefits/BenefitsPage";
import { FadeBox } from "src/itcorpo/shared/fadebox/Fadebox";

// FP
export const App = () => {
  const node = (
    <Page>
      <Page.Header>
        <Header />
      </Page.Header>
      <Page.Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data" element={<Data />} />
          <Route path="/finances" element={<FinancesPage label="IT Corpo Finances" />} />
          <Route path="/offices" element={<OfficesPage label="IT Corpo Offices" />} />
          <Route path="/projects" element={<ProjectsPage label="IT Corpo Projects" />} />
          <Route path="/employees" element={<EmployeesPage label="IT Corpo Employees" />} />
          <Route path="/benefits" element={<BenefitsPage label="IT Corpo Benefits" />} />
        </Routes>
        <FadeBox>
          notification message goes here
        </FadeBox>
      </Page.Main>
    </Page>
  );
  console.log(node)
  return node
};
