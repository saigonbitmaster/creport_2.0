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
    <SimpleShowLayout>
    <TextField source="name" />
        <NumberField source="budget" />
        <TextField source="currency" />
        <DateField source="date" />
    </SimpleShowLayout>
  </Show>
);

export default ShowScreen;
