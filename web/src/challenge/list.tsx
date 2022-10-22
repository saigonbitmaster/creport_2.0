import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  NumberField,
  ReferenceField,
} from "react-admin";

const ListScreen = () => {
  return (
    <List perPage={25} sort={{ field: "date", order: "desc" }} hasCreate>
      <Datagrid>
        <TextField source="name" />
        <ReferenceField source="fundId" reference="funds">
          <TextField source="name" />
        </ReferenceField>
        <NumberField source="budget" />

        <ReferenceField source="fundId" reference="funds" label="Currency">
          <TextField source="currency" />
        </ReferenceField>
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
