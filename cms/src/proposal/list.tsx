import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  ReferenceField,
  SearchInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

import ColoredNumberField from '../components/currencyNumberField'

const ListScreen = () => {
  const Filters = [
    <SearchInput source="name" alwaysOn />,

    <ReferenceInput source="fundId" reference="funds" required alwaysOn>
      <SelectInput optionText="name" fullWidth />
    </ReferenceInput>,

    <ReferenceInput source="proposerId" reference="proposers" required alwaysOn>
      <SelectInput optionText="fullName" fullWidth />
    </ReferenceInput>,
  ];

  return (
    <List
      perPage={25}
      sort={{ field: "date", order: "desc" }}
      hasCreate
      filters={Filters}
    >
      <Datagrid>
        <TextField source="name" />
        <TextField source="projectId" />
        <ReferenceField source="fundId" reference="funds">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="challengeId" reference="challenges">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="proposerId" reference="proposers">
          <TextField source="fullName" />
        </ReferenceField>
        <ColoredNumberField source="requestedBudget" threshold={50000} />
       
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
