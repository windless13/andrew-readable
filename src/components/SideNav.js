import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { COLORS } from '../constants.js';

const Container = styled.div`
    height: 100%;
    float: left;
    background-color: ${COLORS.red2};
`

const SideBarLink = styled.div`
`;

export default class SideNav extends React.Component {
    render(){
        const { categories } = this.props;

        return (
            <Container>
                {categories.map((category) => {
                    return (
                        <Link key={category} to={`/${category}`}>
                            <SideBarLink>{category}</SideBarLink>
                        </Link>
                    );
                })}
            </Container>
        );
    }
}

SideNav.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string),
};

