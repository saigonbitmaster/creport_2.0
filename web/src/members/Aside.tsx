import * as React from 'react';
import {
  
    DateField,
    useTranslate,
    useGetList,
 
    useRecordContext,
} from 'react-admin';
import {
    Typography,
    Card,
    CardContent,
    Box,
 
    Grid,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GradingIcon from '@mui/icons-material/Grading';

import review from '../reviews';
import {
    Order as OrderRecord,
    Review as ReviewRecord,
    Customer,
} from '../types';

const Aside = () => {
    const record = useRecordContext<Customer>();
    return (
        <Box width={400} display={{ xs: 'none', lg: 'block' }}>
            {record && <EventList />}
        </Box>
    );
};

const EventList = () => {
    const record = useRecordContext<Customer>();
    const translate = useTranslate();

    const { data: orders } = useGetList<OrderRecord>('members', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'date', order: 'DESC' },
        filter: { customer_id: record.id },
    });
    const { data: reviews } = useGetList<ReviewRecord>('reviews', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'date', order: 'DESC' },
        filter: { customer_id: record.id },
    });

    return (
        <Box ml={2}>
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {translate('resources.customers.fieldGroups.history')}
                    </Typography>
                    <Grid container rowSpacing={1} columnSpacing={1}>
                        <Grid item xs={6} display="flex" gap={1}>
                            <AccessTimeIcon fontSize="small" color="disabled" />
                            <Box flexGrow={1}>
                                <Typography variant="body2">
                                    {translate(
                                        'resources.customers.fields.first_seen'
                                    )}
                                </Typography>
                                <DateField
                                    record={record}
                                    source="first_seen"
                                />
                            </Box>
                        </Grid>
                        {orders && (
                            <Grid item xs={6} display="flex" gap={1}>
                                <GradingIcon fontSize="small" color="disabled" />
                                <Typography variant="body2" flexGrow={1}>
                                   
                                    {orders.length} quizzes
                                  
                                </Typography>
                            </Grid>
                        )}
                        <Grid item xs={6} display="flex" gap={1}>
                            <AccessTimeIcon fontSize="small" color="disabled" />
                            <Box flexGrow={1}>
                                <Typography variant="body2">
                                    {translate(
                                        'resources.customers.fields.last_seen'
                                    )}
                                </Typography>
                                <DateField record={record} source="last_seen" />
                            </Box>
                        </Grid>
                        {reviews && (
                            <Grid item xs={6} display="flex" gap={1}>
                                <review.icon
                                    fontSize="small"
                                    color="disabled"
                                />
                                <Typography variant="body2" flexGrow={1}>
                                    {translate('resources.reviews.amount', {
                                        smart_count: reviews.length,
                                    })}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
            </Card>

         
        </Box>
    );
};

export default Aside;
