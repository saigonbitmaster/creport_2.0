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
      <Datagrid>
        <TextField source="name" />
        <NumberField source="key" />
        <TextField source="url" />
       
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
