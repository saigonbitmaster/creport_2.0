import * as React from "react";
import {
  SimpleForm,
  TextInput,
  Edit,
  DateInput,
  SelectInput,
  NumberInput,
} from "react-admin";

import Grid from "@mui/material/Grid";
import { RichTextInput } from "ra-input-rich-text";

const choices = [
  { id: "usd", name: "USD" },
  { id: "ada", name: "ADA" },
];

const EditScreen = () => (
  <Edit>
     <SimpleForm>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <TextInput source="name" fullWidth required />
        </Grid>
      
        <Grid item xs={12} md={4} lg={3} xl={2}>
        <TextInput source="key" fullWidth required />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={8} lg={6} xl={4}>
        <TextInput source="url" fullWidth required />
        </Grid>

        <Grid item md={12} />
       
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <RichTextInput source="description" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);

export default EditScreen;
