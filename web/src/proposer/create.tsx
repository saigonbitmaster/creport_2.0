// in src/posts.js
import * as React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";
import Grid from "@mui/material/Grid";
import { RichTextInput } from "ra-input-rich-text";

const VisitorCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <TextInput source="fullName" fullWidth required />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <TextInput source="email" type="email" fullWidth required />
        </Grid>

        <Grid item xs={12} md={4} lg={3} xl={2}>
          <TextInput source="telegram" fullWidth />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <TextInput source="walletAddress" fullWidth />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <RichTextInput source="description" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
);
export default VisitorCreate;
