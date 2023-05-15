import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceInput,
  SelectInput,
  UrlField,
  AutocompleteInput,
} from "react-admin";

const ListScreen = () => {
  const Filters = [
    <ReferenceInput
      source="proposalId"
      reference="proposals"
      required
      alwaysOn
      perPage={-1}
      sort={{ field: "name", order: "ASC" }}
    >
      <AutocompleteInput  optionText="name" optionValue="id"/>
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
        <TextField source="message" />
        <TextField source="author" />
        <DateField source="date" />
        <UrlField source="url" />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
