import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  RichTextField,
  ReferenceField,
  NumberField,
} from "react-admin";

const ShowScreen = () => (
  <Show actions={false}>
    <SimpleShowLayout >
      <TextField source="name" />
      <ReferenceField source="fundId" reference="funds">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="budget" />

      <ReferenceField source="fundId" reference="funds" label="Currency">
        <TextField source="currency" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export default ShowScreen;
