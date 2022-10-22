import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
  NumberField,
} from "react-admin";

const ListScreen = () => {
  return (
    <List perPage={25} sort={{ field: "date", order: "desc" }} hasCreate>
       <Datagrid bulkActionButtons={false}>
        <TextField source="name" />
        <NumberField source="budget" />
        <TextField source="currency" />
        <DateField source="date" />

      </Datagrid>
    </List>
  );
};

export default ListScreen;
