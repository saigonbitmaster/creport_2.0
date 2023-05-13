import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  RichTextField,
  ReferenceField,
  NumberField,
  UrlField
} from "react-admin";

const ShowScreen = () => (
  <Show actions={false}>
    <SimpleShowLayout>
    <TextField source="fullName" label="Name" />
          <TextField source="email" />
          <UrlField source="telegram" />
          <TextField source="walletAddress" />

    </SimpleShowLayout>
  </Show>
);

export default ShowScreen;
