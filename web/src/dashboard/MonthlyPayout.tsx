import * as React from 'react';
import DollarIcon from '@mui/icons-material/AttachMoney';

import CardWithIcon from './CardWithIcon';

interface Props {
    value?: number;
}

const MonthlyPayout = (props: Props) => {
    const { value } = props;
    return (
        <CardWithIcon
            to="/payouts"
            icon={DollarIcon}
            title="Monthly pay out"
            subtitle={`${value} Ada`}
        />
    );
};

export default MonthlyPayout;
