import * as React from "react";
import { List, Datagrid, TextField, EditButton, UrlField, SearchInput } from "react-admin";

import { Box, Drawer } from "@mui/material";
import Steps from "../components/proposalSteps";

const PayoutList = (title = "List of posts") => {
  const [record, setRecord] = React.useState(null);
  const Filters = [
    <SearchInput source="fullName" alwaysOn />,

  ];
  const rowClick = (id, resource, record) => {
    setRecord(record);
    return "";
  };

  return (
    <Box display="flex">
      <List
        perPage={25}
        sort={{ field: "date", order: "desc" }}
        hasCreate
        filters={Filters}
     
        sx={{
          flexGrow: 1,
          transition: (theme: any) =>
            theme.transitions.create(["all"], {
              duration: theme.transitions.duration.enteringScreen,
            }),
          marginRight: record ? "300px" : 0,
        }}
        
      >
        <Datagrid rowClick={rowClick}>
          <TextField source="fullName" label="Name" />
          <TextField source="email" />
          <UrlField source="telegram" />
          <TextField source="walletAddress" />

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
