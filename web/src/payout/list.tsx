import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  DateInput,
  EditButton,
} from "react-admin";
import ColorFieldNumber from "./ColoredNumberField";

import { Box, Drawer } from "@mui/material";
import Steps from "./step";
const listFilters = [
  <DateInput source="date_gte" alwaysOn />,
  <DateInput source="date_lte" alwaysOn />,
];

const PayoutList = () => {
  const [record, setRecord] = React.useState(null);
  const postRowClick = (id, resource, record) => {
    setRecord(record);
    return "";
  };

  return (
    <Box display="flex">
      <List
        filters={listFilters}
        perPage={25}
        sort={{ field: "date", order: "desc" }}
        hasCreate
        sx={{
          flexGrow: 1,
          transition: (theme: any) =>
            theme.transitions.create(["all"], {
              duration: theme.transitions.duration.enteringScreen,
            }),
          marginRight: record ? "300px" : 0,
        }}
      >
        <Datagrid rowClick={postRowClick}>
          <TextField source="id" />

          <TextField source="transactionHash" />
          <ColorFieldNumber
            source="amount"
            options={{ style: "currency", currency: "Ada" }}
          />

          <DateField source="date" />
          <EditButton />
        </Datagrid>
      </List>
      <Drawer
        variant="persistent"
        open={record}
        anchor="right"
        sx={{ zIndex: 100 }}
      >
        {record && <Steps record={record} />}
      </Drawer>
    </Box>
  );
};

export default PayoutList;
