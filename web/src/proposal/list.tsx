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
      filters={Filters}
      hasCreate={false}
    >
        <Datagrid bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="projectId" />
        <ReferenceField source="fundId" reference="funds"  link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="challengeId" reference="challenges"  link="show" >
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="proposerId" reference="proposers"  link="show">
          <TextField source="fullName" />
        </ReferenceField>
        <ColoredNumberField source="requestedBudget" threshold={50000} />
        <SelectField source="projectStatus" choices={choices} />
        <ShowButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
