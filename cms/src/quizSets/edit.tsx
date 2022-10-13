import * as React from "react";
import { Edit, SimpleForm, TextInput, DateTimeInput, NumberInput, Datagrid, TextField, DateField, EditButton, required } from 'react-admin';

const EditScreen = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" />
            <TextInput source="name" required />
            <TextInput source="passedMessage" required sx={{width: 600}} />
      <TextInput source="failedMessage" required sx={{width: 600}} />
            <NumberInput source="value" required />
      <DateTimeInput source="createdDate" defaultValue={new Date()} />
        </SimpleForm>
    </Edit>
);

export default EditScreen