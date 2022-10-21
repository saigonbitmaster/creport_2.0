import * as React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  useTranslate,
  SimpleFormIterator,
  ArrayInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  EditBase,
  EditProps,
} from "react-admin";

import { Box, Typography } from "@mui/material";
import { Payout } from "../types";
interface Props extends EditProps<Payout> {
  onCancel: () => void;
}

const EditScreen = ({ onCancel, ...props }: Props) => (
  <EditBase {...props}>
    <SimpleForm sx={{ maxWidth: 800 }}>
      <SectionTitle label="resources.customers.fieldGroups.identity" />

      <Box display={{ xs: "block", sm: "flex", width: "60%" }}>
        <TextInput source="transactionHash" isRequired fullWidth />
      </Box>
      <Box display={{ xs: "block", sm: "flex", width: "60%" }}>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <DateInput source="date" fullWidth />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="amount" isRequired fullWidth />
        </Box>
      </Box>

      <Separator />
      <SectionTitle label="resources.customers.fieldGroups.address" />
      <ArrayInput source="detail" label="">
        <SimpleFormIterator inline>
          <NumberInput
            source="amount"
            helperText={false}
            label="Amount (Ada)"
          />

          <ReferenceInput label="Quiz" source="quizId" reference="quizzes">
            <SelectInput optionText="title" fullWidth />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>

      <Separator />
    </SimpleForm>
  </EditBase>
);

const SectionTitle = ({ label }: { label: string }) => {
  const translate = useTranslate();

  return (
    <Typography variant="h6" gutterBottom>
      {translate(label as string)}
    </Typography>
  );
};

const Separator = () => <Box pt="1em" />;

export default EditScreen;