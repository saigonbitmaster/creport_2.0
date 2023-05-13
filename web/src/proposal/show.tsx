import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  RichTextField,
  ReferenceField,
  NumberField,
  SelectField
} from "react-admin";
import ColoredNumberField from "../components/currencyNumberField";
import { choices } from "../data/data";

const ShowScreen = () => (
  <Show actions={false}>
    <SimpleShowLayout>
    <TextField source="name" />
        <TextField source="projectId" />
        <ReferenceField source="fundId" reference="funds" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="challengeId" reference="challenges" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="proposerId" reference="proposers" link="show">
          <TextField source="fullName" />
        </ReferenceField>
        <ColoredNumberField source="requestedBudget" threshold={50000} />
        <SelectField source="projectStatus" choices={choices} />

    </SimpleShowLayout>
  </Show>
);

export default ShowScreen;
