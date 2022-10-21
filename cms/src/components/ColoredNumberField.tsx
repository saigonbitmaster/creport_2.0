import * as React from "react";
import { useRecordContext, NumberField, NumberFieldProps } from "react-admin";

interface myProps extends NumberFieldProps {
  threshold?: number;
}

//use: <ColoredNumberField source="value" threshold={1000} />
const ColoredNumberField = (props: myProps) => {
  const record = useRecordContext(props);
  const threshold = props.threshold || 50000;
  
  if (!record || !props.source) {
    return null;
  }
  return record[props.source] > threshold ? (
    <NumberField {...props} sx={{ color: "red" }} />
  ) : (
    <NumberField {...props} />
  );
};

ColoredNumberField.defaultProps = NumberField.defaultProps;

export default ColoredNumberField;
