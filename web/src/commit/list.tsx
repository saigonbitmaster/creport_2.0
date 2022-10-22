import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceInput,
  SelectInput,
  UrlField,
} from "react-admin";

const ListScreen = () => {
  const Filters = [
    <ReferenceInput source="proposalId" reference="proposals" required alwaysOn>
      <SelectInput optionText="name" fullWidth />
    </ReferenceInput>,
  ];

  return (
    <List
      perPage={25}
      sort={{ field: "date", order: "desc" }}
      hasCreate={false}
      filters={Filters}
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="sha" />
        <TextField source="rate" />
        <TextField source="message" />
        <TextField source="author" />
        <DateField source="date" />
        <UrlField source="url" />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
