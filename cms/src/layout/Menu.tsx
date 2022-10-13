import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import DeselectIcon from "@mui/icons-material/Deselect";
import FitbitIcon from "@mui/icons-material/Fitbit";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import NotesIcon from "@mui/icons-material/Notes";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';

import {
  useTranslate,
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useSidebarState,
} from "react-admin";

import SubMenu from "./SubMenu";

type MenuName = "menuProposals" | "menuReports" | "menuTools" | "menuAccounts";

const Menu = ({ dense = false }: MenuProps) => {
  const [state, setState] = useState({
    menuProposals: true,
    menuReports: true,
    menuTools: true,
  });
  const translate = useTranslate();
  const [open] = useSidebarState();

  const handleToggle = (menu: MenuName) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <Box
      sx={{
        width: open ? 200 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <DashboardMenuItem />

      <SubMenu
        handleToggle={() => handleToggle("menuReports")}
        isOpen={state.menuReports}
        name="pos.menu.reports"
        icon={<DoneAllOutlinedIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/members"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.proposalKpis.name`, {
            smart_count: 2,
          })}
          leftIcon={<GradingOutlinedIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/segments"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.fundDeliveries.name`, {
            smart_count: 2,
          })}
          leftIcon={<FormatListNumberedOutlinedIcon />}
          dense={dense}
        />
           <MenuItemLink
          to="/quizSets"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.gits.reportName`, {
            smart_count: 2,
          })}
          leftIcon={<QrCodeOutlinedIcon />}
          dense={dense}
        />
      </SubMenu>

      <SubMenu
        handleToggle={() => handleToggle("menuTools")}
        isOpen={state.menuTools}
        name="pos.menu.tools"
        icon={<DeselectIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/fetchCardano"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.cardanos.name`, {
            smart_count: 2,
          })}
          leftIcon={<FitbitIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/fetchGithub"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.gits.name`, {
            smart_count: 2,
          })}
          leftIcon={<FormatListBulletedIcon />}
          dense={dense}
        />
         <MenuItemLink
          to="/importExcels"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.reports.import`, {
            smart_count: 2,
          })}
          leftIcon={<LibraryBooksOutlinedIcon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("menuProposals")}
        isOpen={state.menuProposals}
        name="pos.menu.proposals"
        icon={<FileCopyOutlinedIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/proposals"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.proposals.name`, {
            smart_count: 2,
          })}
          leftIcon={<NotesIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/challenges"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.challenges.name`, {
            smart_count: 2,
          })}
          leftIcon={<BlurOnIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/funds"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.funds.name`, {
            smart_count: 2,
          })}
          leftIcon={<AttachMoneyIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/proposers"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.proposers.name`, {
            smart_count: 2,
          })}
          leftIcon={<PeopleOutlinedIcon />}
          dense={dense}
        />
      </SubMenu>
      <MenuItemLink
        to="/reviews"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.reviews.name`, {
          smart_count: 2,
        })}
        leftIcon={<RateReviewOutlinedIcon />}
        dense={dense}
      />
    </Box>
  );
};

export default Menu;
