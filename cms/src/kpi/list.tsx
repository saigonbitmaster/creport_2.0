import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  FunctionField,
  ReferenceField,
  SearchInput,
  ReferenceInput,
  SelectInput,
  SelectField,
} from "react-admin";
import { Link } from "react-router-dom";
import ColoredNumberField from "../components/currencyNumberField";
import ProposalRateField from "../components/rateProposal";
import { choices } from "../data/data";

const ListScreen = () => {
  const Filters = [
    <SearchInput source="name" alwaysOn />,
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
    <ReferenceInput
      source="proposerId"
      reference="proposers"
      required
      alwaysOn
      // mean no pagination
      perPage={-1}
      sort={{ field: "fullName", order: "ASC" }}
    >
      <SelectInput optionText="fullName" fullWidth />
    </ReferenceInput>,
  ];

  return (
    <List
      perPage={25}
      sort={{ field: "date", order: "desc" }}
      hasCreate={false}
      filters={Filters}
    >
      <Datagrid bulkActionButtons={false}>
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
      </Datagrid>
    </List>
  );
};

export default ListScreen;
