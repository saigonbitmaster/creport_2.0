import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  DateInput,
  EditButton
} from "react-admin";


const listFilters = [
  <DateInput source="createdAt_gte" alwaysOn />,
  <DateInput source="createdAt_lte" alwaysOn />,
];

const ListScreen = () => {
  return (
    <List
      filters={listFilters}
      perPage={25}
      sort={{ field: "date", order: "desc" }}
      resource="quizSets"
      hasCreate
    >
      <Datagrid   sx={{
                '& .RaDatagrid-headerCell': { fontWeight: 'bold' },
            }}>
        <TextField source="id" />
        <TextField source="name" />
        <NumberField source="value" />

        <DateField source="createdAt" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
