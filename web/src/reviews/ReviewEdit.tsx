import * as React from "react";
import {
  EditBase,
  useTranslate,
  TextInput,
  SimpleForm,
  DateField,
  EditProps,
  Labeled,
  SelectInput,
  ReferenceInput,
} from "react-admin";
import { Box, Grid, Stack, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RatingInput from "../components/ratingInput";

import ProductReferenceField from "./QuizReferenceField";
import ReviewEditToolbar from "./ReviewEditToolbar";
import { Review } from "../types";

interface Props extends EditProps<Review> {
  onCancel: () => void;
}

const ReviewEdit = ({ onCancel, ...props }: Props) => {
  const translate = useTranslate();
  return (
    <EditBase {...props}>
      <Box pt={5} width={{ xs: "100vW", sm: 400 }} mt={{ xs: 2, sm: 1 }}>
        <Stack direction="row" p={2}>
          <Typography variant="h6" flex="1">
            {translate("resources.reviews.detail")}
          </Typography>
          <IconButton onClick={onCancel} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
        <SimpleForm sx={{ pt: 0, pb: 0 }} toolbar={<ReviewEditToolbar />}>
          <Grid container rowSpacing={1} mb={1}>
            <Grid item xs={6}>
              <ReferenceInput label="Quiz" source="quizId" reference="quizzes">
                <SelectInput optionText="title" />
              </ReferenceInput>

              <SelectInput
                source="status"
                sx={{ width: 300 }}
                choices={[
                  { id: "pending", name: "Pending" },
                  { id: "accept", name: "Accept" },
                  { id: "reject", name: "Reject" },
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <Labeled>
                <ProductReferenceField label="Quiz" />
              </Labeled>
            </Grid>
            <Grid item xs={6}>
              <Labeled>
                <DateField source="date" />
              </Labeled>
            </Grid>
            <Grid item xs={6}>
              <RatingInput source="rating"></RatingInput>
            </Grid>
          </Grid>
          <TextInput source="comment" maxRows={15} multiline fullWidth />
        </SimpleForm>
      </Box>
    </EditBase>
  );
};

export default ReviewEdit;
