import * as React from "react";
import get from "lodash/get";
import { useRecordContext } from "react-admin";
import Rating from "@mui/material/Rating";

const RateField = ({ source }) => {
  const record = useRecordContext();

  return record ? (
    <Rating name="read-only" value={get(record, source)} readOnly />
  ) : null;
};

export default RateField;
