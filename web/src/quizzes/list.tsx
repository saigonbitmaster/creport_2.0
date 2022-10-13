import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  DateInput,
  EditButton,
  BooleanField,
  ReferenceField,
  ReferenceInput,
  SelectInput,
} from "react-admin";

import RowClick from "./rowClick";

const listFilters = [
  <DateInput source="createdAt_gte" alwaysOn />,
  <DateInput source="createdAt_lte" alwaysOn />,

  <ReferenceInput source="quizSetId" reference="quizSets" alwaysOn>
    <SelectInput optionText="name" />
  </ReferenceInput>,
];

const ListScreen = () => {
  return (
    <List
      filters={listFilters}
      perPage={25}
      sort={{ field: "date", order: "desc" }}
      hasCreate
     
    >
      <Datagrid rowClick="expand" expand={<RowClick />}>
        <TextField source="id" />
        <BooleanField source="singleChoice" />
        {/* pre to re*/}
        <TextField source="title" component="pre" />
        <ReferenceField
          label="Quiz set"
          source="quizSetId"
          reference="quizSets"
        >
          <TextField source="name" />
        </ReferenceField>

        <DateField source="createdAt" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
