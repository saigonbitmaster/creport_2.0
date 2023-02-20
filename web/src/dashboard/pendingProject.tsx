import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import CustomerIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";
import { useTranslate, useGetList } from "react-admin";
import { subDays } from "date-fns";
import { stringify } from "query-string";
import CardWithIcon from "./CardWithIcon";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Customer } from "../types";

const PendingProposals = () => {
  const translate = useTranslate();

  const aMonthAgo = subDays(new Date(), 30);
  aMonthAgo.setDate(aMonthAgo.getDate() - 30);
  aMonthAgo.setHours(0);
  aMonthAgo.setMinutes(0);
  aMonthAgo.setSeconds(0);
  aMonthAgo.setMilliseconds(0);

  const {
    isLoading,
    data: proposals,
    total,
  } = useGetList<any>("proposals", {
    filter: {
      projectStatus: "inProgress",
    },
    pagination: { page: 1, perPage: 13 },
  });

  const nb = proposals ? total : 0;
  return (
    <CardWithIcon
      to={{
        pathname: "/proposals",
        search: stringify({
          filter: JSON.stringify({ projectStatus: "inProgress" }),
        }),
      }}
      icon={AccessTimeOutlinedIcon}
      title="Pending projects"
      subtitle={nb}
    >
      <List sx={{ display: isLoading ? "none" : "block" }}>
        {proposals
          ? proposals.map((record: Customer) => (
              <ListItem
                button
                to={`/proposals/${record.id}`}
                component={Link}
                key={record.id}
              >
                <ListItemAvatar>
                  <Avatar src={`${record.avatar}?size=32x32`} />
                </ListItemAvatar>
                <ListItemText primary={record.name} />
              </ListItem>
            ))
          : null}
      </List>
      <Box flexGrow={1}>&nbsp;</Box>
      <Button
        sx={{ borderRadius: 0 }}
        component={Link}
        to="/proposals"
        size="small"
        color="primary"
      >
        <Box p={1} sx={{ color: "primary.main" }}>
          See all projects
        </Box>
      </Button>
    </CardWithIcon>
  );
};

export default PendingProposals;
