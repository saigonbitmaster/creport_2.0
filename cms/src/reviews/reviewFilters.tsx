import * as React from 'react';
import {
    AutocompleteInput,
    DateInput,
    ReferenceInput,
    SearchInput,
    SelectInput,
} from 'react-admin';
import { Customer } from '../types';

const reviewFilters = [
    <SearchInput source="q" alwaysOn />,
    <SelectInput  
        alwaysOn
        source="status"
        choices={[
            { id: 'accepted', name: 'Accepted' },
            { id: 'pending', name: 'Pending' },
            { id: 'rejected', name: 'Rejected' },
        ]}
    />,
    <ReferenceInput source="customer_id" reference="customers" label="Member">
        <AutocompleteInput sx={{ width: 300 }}
            optionText={(choice?: Customer) =>
                choice?.id // the empty choice is { id: '' }
                    ? `${choice.first_name} ${choice.last_name}`
                    : ''
            }
        />
    </ReferenceInput>,
    <ReferenceInput source="quizId" reference="quizzes">
        <AutocompleteInput optionText="title" sx={{ width: 300 }} />
    </ReferenceInput>,
    <DateInput source="createdAt_gte" />,
    <DateInput source="createdAt_lte" />,
];

export default reviewFilters;
