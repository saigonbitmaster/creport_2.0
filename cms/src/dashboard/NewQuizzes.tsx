import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';
import GradingIcon from '@mui/icons-material/Grading';

interface Props {
    value?: number;
}

const NewQuizzes = (props: Props) => {
    const { value } = props;
    const translate = useTranslate();
    return (
        <CardWithIcon
            to="/quizzes"
            icon={GradingIcon}
            title="New quizzes"
            subtitle={value}
        />
    );
};

export default NewQuizzes;
