// in src/posts.js
import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  DateInput,
} from "react-admin";
import RatingInput from '../components/ratingInput';

const CreateScreen = () => {
  return (
    <Create redirect="list">
      <SimpleForm>
        <ReferenceInput label="Quiz set" source="quizId" reference="quizzes" >
          <SelectInput optionText="title"  sx={{ width: 300 }}/>
        </ReferenceInput>
        <SelectInput source="status"   sx={{ width: 300 }} choices={[
    { id: 'pending', name: 'Pending' },
    { id: 'accept', name: 'Accept' },
    { id: 'reject', name: 'Reject' },
]} />
    
        <TextInput
          source="comment"
          required
          sx={{ width: 600 }}
          label="comment"
          multiline
        />
        <DateInput source="date" />
        <RatingInput source="rating"> </RatingInput>
      </SimpleForm>
    </Create>
  );
};

export default CreateScreen;
