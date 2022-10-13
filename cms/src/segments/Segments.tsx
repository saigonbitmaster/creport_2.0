import * as React from 'react';
import {
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { useTranslate, Title } from 'react-admin';

import LinkToRelatedCustomers from './LinkToRelatedMembers';
import segments from './data';

const Segments = () => {
    const translate = useTranslate();

    return (
        <Card sx={{ mt: 8 }}>
            <Title
                title="abc"
            />
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            {translate('resources.segments.fields.name')}
                        </TableCell>
                        <TableCell> {translate('resources.segments.fields.members')}  </TableCell >
                        <TableCell> {translate('resources.segments.fields.description')}   </TableCell >
                    </TableRow>
                </TableHead>
                <TableBody>
                    {segments.map(segment => (
                        <TableRow key={segment.id}>
                            <TableCell>{translate(segment.name)}</TableCell>
                            <TableCell>
                                <LinkToRelatedCustomers segment={segment.id} />
                            </TableCell>
                            <TableCell>
                                {segment.description}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};

export default Segments;
