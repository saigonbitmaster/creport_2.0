import * as React from 'react';
import { ReferenceField, ReferenceFieldProps, TextField } from 'react-admin';

interface Props {
    source?: string;
}

const ProductReferenceField = (
    props: Props &
        Omit<Omit<ReferenceFieldProps, 'source'>, 'reference' | 'children'>
) => (
    <ReferenceField
        label="Quiz"
        source="quizId"
        reference="quizzes"
        {...props}
    >
        <TextField source="title" />
    </ReferenceField>
);

ProductReferenceField.defaultProps = {
    source: 'quizId',
};

export default ProductReferenceField;
