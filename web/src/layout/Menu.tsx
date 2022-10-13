import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import LabelIcon from '@mui/icons-material/Label';

import {
    useTranslate,
    DashboardMenuItem,
    MenuItemLink,
    MenuProps,
    useSidebarState,
} from 'react-admin';

import members from '../members';
import reviews from '../reviews';
import SubMenu from './SubMenu';
import payouts from '../payout';

type MenuName = 'menuCatalog' | 'menuSales' | 'menuCustomers' | 'bLearns';

const Menu = ({ dense = false }: MenuProps) => {
    const [state, setState] = useState({
        menuCatalog: true,
        menuSales: true,
        menuCustomers: true,
    });
    const translate = useTranslate();
    const [open] = useSidebarState();

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <Box
            sx={{
                width: open ? 200 : 50,
                marginTop: 1,
                marginBottom: 1,
                transition: theme =>
                    theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
            }}
        >
            <DashboardMenuItem />
          
            <SubMenu
                handleToggle={() => handleToggle('menuCustomers')}
                isOpen={state.menuCustomers}
                name="pos.menu.Members"
                icon={<members.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to="/members"
                    state={{ _scrollToTop: true }}
                    primaryText={translate(`resources.customers.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<members.icon />}
                    dense={dense}
                />
                <MenuItemLink
                    to="/segments"
                    state={{ _scrollToTop: true }}
                    primaryText={translate(`resources.segments.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<LabelIcon />}
                    dense={dense}
                />
            </SubMenu>
            <MenuItemLink
                to="/reviews"
                state={{ _scrollToTop: true }}
                primaryText={translate(`resources.reviews.name`, {
                    smart_count: 2,
                })}
                leftIcon={<reviews.icon />}
                dense={dense}
            />
             
            <SubMenu
                handleToggle={() => handleToggle('bLearns')}
                isOpen={state.menuCustomers}
                name="pos.menu.bLearns"
                icon={<members.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to="/quizSets"
                    state={{ _scrollToTop: true }}
                    primaryText={translate(`resources.quizSets.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<members.icon />}
                    dense={dense}
                />
                <MenuItemLink
                    to="/quizzes"
                    state={{ _scrollToTop: true }}
                    primaryText={translate(`resources.quizzes.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<LabelIcon />}
                    dense={dense}
                />
            </SubMenu>
            <MenuItemLink
                to="/payouts"
                state={{ _scrollToTop: true }}
                primaryText={translate(`resources.payouts.name`, {
                    smart_count: 2,
                })}
                leftIcon={<payouts.icon />}
                dense={dense}
            />
        </Box>
    );
};

export default Menu;
