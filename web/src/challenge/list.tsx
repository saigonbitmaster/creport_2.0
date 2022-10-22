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
    <List
      perPage={25}
      sort={{ field: "date", order: "desc" }}
      hasCreate={false}
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" />
        <ReferenceField source="fundId" reference="funds">
          <TextField source="name" />
        </ReferenceField>
        <NumberField source="budget" />

        <ReferenceField source="fundId" reference="funds" label="Currency">
          <TextField source="currency" />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};

export default ListScreen;
