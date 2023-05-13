import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  RichTextField,
  ReferenceField,
  NumberField,
  SelectField,
  FunctionField,
  Link
} from "react-admin";

import ColoredNumberField from "../components/currencyNumberField";
import ProposalRateField from "../components/rateProposal";
import { choices } from "../data/data";

const ShowScreen = () => (
  <Show actions={false}>
    <SimpleShowLayout>
    <TextField source="name" />
        <ProposalRateField label="Rate" />
        <TextField source="projectId" />
        <SelectField source="projectStatus" choices={choices} />
        <ReferenceField source="fundId" reference="funds">
          <TextField source="name" />
        </ReferenceField>

        <FunctionField
          label="Git Commits"
          render={(record) => (
            <Link
              to={`/commits?filter=${JSON.stringify({
                proposalId: record.id,
              })}`}
            >
              {record.commits}
            </Link>
          )}
        />
        <ReferenceField source="challengeId" reference="challenges">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="proposerId" reference="proposers">
          <TextField source="fullName" />
        </ReferenceField>
        <ColoredNumberField source="requestedBudget" threshold={50000} />
    </SimpleShowLayout>
  </Show>
);

export default ShowScreen;
