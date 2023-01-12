import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  NumberField,
  ReferenceField,
  ReferenceInput,
  SearchInput,
  SelectInput,
} from "react-admin";

const ListScreen = () => {
  const Filters = [
    <SearchInput source="keyword" alwaysOn />,

    <ReferenceInput
      source="fundId"
      reference="funds"
      required
      alwaysOn
      // mean no pagination
      perPage={-1}
      sort={{ field: "name", order: "ASC" }}
    >
      <SelectInput optionText="name" fullWidth />
    </ReferenceInput>,
  ];

  return (
    <List
      perPage={25}
      sort={{ field: "date", order: "desc" }}
      filters={Filters}
      hasCreate
    >
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
