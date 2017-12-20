import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { COLORS, BREAKPOINTS, SIDENAV_WIDTH } from '../constants.js';

const Container = styled.div`
    flex-shrink: 0;
    width: ${SIDENAV_WIDTH};
    padding: 10px 20px;
    background-color: ${COLORS.gray1};
`

const SideBarLink = styled.div`
    padding: 15px 0;
    text-transform: uppercase;
    color: black;
    text-decoration: none;

    &:hover {
        color: #c00;
    }
`;

export default function SideNav({ categories }) {
    return (
        <Container>
            {categories && categories.map((category) => {
                return (
                    <Link style={{ textDecoration: 'none' }}key={category} to={`/${category}`}>
                        <SideBarLink>{category}</SideBarLink>
                    </Link>
                );
            })}
        </Container>
    );
}

SideNav.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string),
};
