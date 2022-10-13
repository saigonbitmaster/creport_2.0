import * as React from 'react';
import { SelectArrayInput, SelectArrayInputProps } from 'react-admin';

import segments from '../segments/data';

const SegmentsInput = (props: SelectArrayInputProps) => (
    <SelectArrayInput
        {...props}
        source="groups"
        translateChoice
        choices={segments}
        label="Roles"
    />
);

export default SegmentsInput;
