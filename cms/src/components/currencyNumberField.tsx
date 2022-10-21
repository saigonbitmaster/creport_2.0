import * as React from "react";
import { useRecordContext, NumberField, NumberFieldProps, useGetOne } from "react-admin";

interface myProps extends NumberFieldProps {
  threshold?: number;
}

//use: <ColoredNumberField source="value" threshold={1000} />
const ColoredNumberField = (props: myProps) => {
  const record = useRecordContext(props);
  const threshold = props.threshold || 50000;
  const { data: fund, isLoading, error } = useGetOne('funds', { id: record.fundId });

  //currency must be ADA, USD or Ada, usd 
  const currency = error? null : isLoading ? null : fund.currency

  if (!record || !props.source) {
    return null;
  }
  return record[props.source] > threshold ? (
    <NumberField {...props} sx={{ color: "red" }} options={currency? {style: "currency", currency: currency} : null}/>
  ) : (
    <NumberField {...props} options={currency? {style: "currency", currency: currency} : null}/>
  );
};

ColoredNumberField.defaultProps = NumberField.defaultProps;

export default ColoredNumberField;
