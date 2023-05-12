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
  <Show>
    <SimpleShowLayout>
    <TextField source="name" />
        <TextField source="projectId" />
        <ReferenceField source="fundId" reference="funds">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="challengeId" reference="challenges" >
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="proposerId" reference="proposers">
          <TextField source="fullName" />
        </ReferenceField>
        <ColoredNumberField source="requestedBudget" threshold={50000} />
        <SelectField source="projectStatus" choices={choices} />

    </SimpleShowLayout>
  </Show>
);

export default ShowScreen;
