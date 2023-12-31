import React from "react";
import { Link } from "react-router-dom";
import { AppHeader } from "@dynatrace/strato-components-preview";
import { Dropdown } from "src/itcorpo/shared/dropdown/Dropdown";

const items = {
  'PL': "Poland",
  "LT": "Lithuania",
  "LV": "Latvia"
}

export const Header = () => {
  const countryChange = (country: string) => {
    console.log(country)
  }

  return (<>
    <AppHeader>
      <AppHeader.NavItems>
        <AppHeader.AppNavLink as={Link} to="/" />
        <AppHeader.NavItem as={Link} to="/data">
          Explore Data
        </AppHeader.NavItem>
        <AppHeader.NavItem as={Link} to="/finances">
          Finances
        </AppHeader.NavItem>
        <AppHeader.NavItem as={Link} to="/offices">
          Offices
        </AppHeader.NavItem>
        <AppHeader.NavItem as={Link} to="/projects">
          Projects
        </AppHeader.NavItem>
        <AppHeader.NavItem as={Link} to="/employees">
          Employees
        </AppHeader.NavItem>
        <AppHeader.NavItem as={Link} to="/benefits">
          Benefits
        </AppHeader.NavItem>
      </AppHeader.NavItems>
    </AppHeader>
    <Dropdown items={items} onChanged={countryChange}></Dropdown>
  </>);
};
