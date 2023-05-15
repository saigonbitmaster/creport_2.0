import {
  List,
  Datagrid,
  TextField,
  EditButton,
  ReferenceField,
  SearchInput,
  ReferenceInput,
  SelectInput,
  SelectField,
  ShowButton
} from "react-admin";
import { choices } from "../data/data";
import ColoredNumberField from "../components/currencyNumberField";

const ListScreen = () => {
  const Filters = [
    <SearchInput source="keyword" alwaysOn />,

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
    <SelectInput source="projectStatus" choices={choices} fullWidth alwaysOn />,
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
        <ReferenceField source="challengeId" reference="challenges" >
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="proposerId" reference="proposers">
          <TextField source="fullName" />
        </ReferenceField>
        <ColoredNumberField source="requestedBudget" threshold={50000} />
        <SelectField source="projectStatus" choices={choices} />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
