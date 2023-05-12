import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
  NumberField,
  ShowButton
} from "react-admin";

const ListScreen = () => {
  return (
    <List perPage={25} sort={{ field: "date", order: "desc" }}       hasCreate={false}
    >
      <Datagrid>
        <TextField source="name" />
        <NumberField source="budget" />
        <TextField source="currency" />
        <DateField source="date" />
        <ShowButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
