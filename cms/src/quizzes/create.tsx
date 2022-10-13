// in src/posts.js
import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  SelectInput
} from "react-admin";

const validateForm = (values) => {
  let errors: any = {};
  const choices = values.choices.map((item) => item.name);
  let validateName = choices.filter(
    (item, index) => choices.indexOf(item) !== index
  );

  if (validateName.length > 0) {
    errors.choices = "Name must be unique";
  }
  return errors;
};

const CreateScreen = () => (
  <Create redirect="list">
    <SimpleForm validate={validateForm}>
    <ReferenceInput label="Quiz set" source="quizSetId" reference="quizSets">
    <SelectInput optionText="name" />
</ReferenceInput>
      <TextInput source="title" required sx={{width: 600}} label="Question" multiline/>
      <BooleanInput source="singleChoice"  defaultValue={true} />
    
      <ArrayInput source="choices">
        <SimpleFormIterator inline>
          <TextInput source="name" helperText={false} label="Key"/>
          <TextInput source="label" helperText={false} resettable sx={{width: 500}} label="Answer"/>
     
          <BooleanInput source="value" helperText={false} defaultValue={true} label="Default selection"/>
          <BooleanInput
            source="isRight"
            helperText={false}
            defaultValue={true}
          />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

export default CreateScreen;
