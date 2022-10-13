// in src/posts.js
import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  NumberInput,
  DateTimeInput,
} from "react-admin";

const CreateScreen = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="name" required />
      <NumberInput source="value" required />
      <TextInput source="passedMessage" required sx={{width: 600}}/>
      <TextInput source="failedMessage" required sx={{width: 600}}/>
      <DateTimeInput source="createdDate" defaultValue={new Date()} />
    </SimpleForm>
  </Create>
);

export default CreateScreen;
