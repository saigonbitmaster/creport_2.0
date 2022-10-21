import * as React from "react";
import { useRecordContext } from "react-admin";
import Rating from "@mui/material/Rating";

const RateField = (props) => {
  const record = useRecordContext();
  const lastMonthScore = record.lastMonthCommits ? 1 : 0;
  const commitSore = record.commits > 10 ? 4 : record.commits > 5 ? 3 : 2;

  return record ? (
    <Rating name="read-only" value={lastMonthScore + commitSore} readOnly />
  ) : null;
};

export default RateField;
