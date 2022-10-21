// in src/posts.js
import * as React from "react";
import { useInput } from "react-admin";
import Rating from "@mui/material/Rating";

const RatingInput = (props) => {
  const [value, setValue] = React.useState(2);

  const {
    field,
    fieldState: { isTouched, invalid, error },
    formState: { isSubmitted },
  } = useInput(props);

  return (
    <Rating
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      {...field}
    />
  );
};

export default RatingInput;
