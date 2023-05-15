import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  UrlField,
  SearchInput,
  ShowButton
} from "react-admin";
import Button from '@mui/material/Button';


import { Box, Drawer } from "@mui/material";
import Steps from "../components/proposalSteps";

const ListScreen = (title = "List of posts") => {
  const [record, setRecord] = React.useState(null);
  const Filters = [<SearchInput source="keyword" alwaysOn />];
  const rowClick = (id, resource, record) => {
    setRecord(record);
    return "";
  };

  return (
    <Box display="flex">
      <List
        perPage={25}
        sort={{ field: "date", order: "desc" }}
        hasCreate={false}

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
        <Datagrid rowClick={rowClick}   bulkActionButtons={false}>
          <TextField source="fullName" label="Name" />
          <UrlField source="telegram" />
          <TextField source="walletAddress" />
          <Button variant="text">View proposals</Button>
          <ShowButton />
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

export default ListScreen;
