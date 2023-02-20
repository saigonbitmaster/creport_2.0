import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTranslate, useGetList } from "react-admin";

import CardWithIcon from './CardWithIcon';
import GradingIcon from '@mui/icons-material/Grading';

interface Props {
    value?: number;
}

const FundProposal = (props: Props) => {

  const { isLoading, data: proposals, total } = useGetList<any>("proposals", {
    filter: {
    
    },
    pagination: { page: 1, perPage: 10 },
  });

  const nb = proposals ? total : 0;

    const { value } = props;
 //   const translate = useTranslate();
    return (
        <CardWithIcon
            to="/proposals"
            icon={GradingIcon}
            title="Funded projects"
            subtitle={nb}
        />
    );
};

export default FundProposal;
