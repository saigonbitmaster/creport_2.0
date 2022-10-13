import * as React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";

import {
  ReferenceField,
  FunctionField,
  useGetList,
  useTranslate,
} from "react-admin";

import ReorderIcon from "@mui/icons-material/Reorder";
import { stringify } from "query-string";

import CardWithIcon from "./CardWithIcon";
import { Customer, Review } from "../types";

const PendingReviews = () => {
  const translate = useTranslate();
  const {
    data: reviews,
    total,
  } = useGetList<Review>("quizzes", {
    filter: { status: "pending" },
    sort: { field: "date", order: "DESC" },
    pagination: { page: 1, perPage: 10 },
  });

  const display = "block";

  return (
    <CardWithIcon
      to={{
        pathname: "/reviews",
        search: stringify({
          filter: JSON.stringify({ status: "pending" }),
        }),
      }}
      icon={CommentIcon}
      title={translate("pos.dashboard.pending_reviews")}
      subtitle={total}
    >
      <List sx={{ display }}>
        {reviews?.map((record: any) => (
          <>
            <ListItem key={record.id} alignItems="flex-start">
              <ListItemAvatar>
                <ReorderIcon></ReorderIcon>
              </ListItemAvatar>
              <ReferenceField
                record={record}
                source="quizSetId"
                reference="quizSets"
                link={false}
              >
                <FunctionField
                  render={(customer: Customer) => (
                    <ListItemText
                      primary={customer.name}
                      sx={{
                        overflowY: "hidden",

                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        paddingRight: 0,
                      }}
                    />
                  )}
                />
              </ReferenceField>
            </ListItem>

            <ListItem
              key={record.id + 1}
              button
              component={Link}
              to={`/reviews/?filter=${JSON.stringify({quizId: record.id})}`}
              alignItems="flex-start"
            >
              <ListItemText
                secondary={record.title}
                sx={{
                  overflowY: "hidden",

                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  paddingRight: 0,
                }}
              />
            </ListItem>
          </>
        ))}
      </List>
      <Box flexGrow={1}>&nbsp;</Box>
      <Button
        sx={{ borderRadius: 0 }}
        component={Link}
        to="/reviews"
        size="small"
        color="primary"
      >
        <Box p={1} sx={{ color: "primary.main" }}>
          {translate("pos.dashboard.all_reviews")}
        </Box>
      </Button>
    </CardWithIcon>
  );
};

export default PendingReviews;
