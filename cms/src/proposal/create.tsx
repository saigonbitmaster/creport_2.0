// in src/posts.js
import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
  DateInput,
} from "react-admin";
import Grid from "@mui/material/Grid";
import { RichTextInput } from "ra-input-rich-text";
import { choices } from "../data/data";

const CreateScreen = () => (
  <Create redirect="list">
    <SimpleForm>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <TextInput source="name" fullWidth required />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="projectId" required label="project Id" />
        </Grid>

        <Grid item md={12} />
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <TextInput source="proposalUrl" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput source="requestedBudget" label="budget" />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <ReferenceInput source="fundId" reference="funds" >
            <SelectInput optionText="name" fullWidth required />
          </ReferenceInput>
        </Grid>
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <ReferenceInput source="challengeId" reference="challenges" >
            <SelectInput optionText="name" fullWidth required/>
          </ReferenceInput>
        </Grid>
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <SelectInput source="projectStatus" choices={choices} fullWidth />
        </Grid>
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <ReferenceInput source="proposerId" reference="proposers" >
            <SelectInput optionText="fullName" fullWidth required/>
          </ReferenceInput>
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <ReferenceArrayInput source="previousProposals" reference="proposals">
            <SelectArrayInput optionText="fullName" fullWidth />
          </ReferenceArrayInput>
        </Grid>

        <Grid item xs={12} md={8} lg={6} xl={4}>
          <ReferenceArrayInput source="coProposers" reference="proposers">
            <SelectArrayInput optionText="fullName" fullWidth />
          </ReferenceArrayInput>
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <TextInput source="walletAddress" fullWidth />
        </Grid>
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <TextInput source="smartContract" fullWidth />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <TextInput source="gitLink" fullWidth />
        </Grid>
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <DateInput source="startDate" fullWidth />
        </Grid>
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <DateInput source="completeDate" fullWidth />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={12} lg={12} xl={8}>
          <RichTextInput source="description" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
);
export default CreateScreen;
