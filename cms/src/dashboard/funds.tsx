import * as React from "react";
import DollarIcon from "@mui/icons-material/AttachMoney";
import { useTranslate, useGetList } from "react-admin";
import CardWithIcon from "./CardWithIcon";

interface Props {
  value?: number;
}

const Funds = (props: Props) => {
  const {
    isLoading,
    data: funds,
    total,
  } = useGetList<any>("funds", {
    filter: {
     
    },
    pagination: { page: 1, perPage: 100 },
  });
  console.log(funds)
  const nf = funds? total : 0;
  const totalBudget = funds?  funds.reduce(
    (accumulator, record) => accumulator + record.budget,
    0
  ): 0;
  return (
    <CardWithIcon
      to="/funds"
      icon={DollarIcon}
      title={`${nf} Funds`}
      subtitle={`${(totalBudget/1000000).toFixed(2)} m$`}
    />
  );
};

export default Funds;
