import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { COLORS, BREAKPOINTS, HEADER_HEIGHT } from '../constants.js';

const Container = styled.div`
    position: absolute;
    top: ${HEADER_HEIGHT};
    left: 0;
    background-color: ${COLORS.red2};
`

const SideBarLink = styled.div`
`;

export default class MobileSideNav extends React.Component {
    componentWillMount() {
        document.addEventListener('click', this.handleClick, false);
    }

    componentWillUnMount() {
        document.removeEventListener('click', this.handleClick, false);
    }

    handleClick = (event) => {
        const { closeMobileNav, mobileNavOpen, hamburgerRef } = this.props;

        const hamburgerNode = ReactDOM.findDOMNode(hamburgerRef);
        if (hamburgerNode && hamburgerNode.contains(event.target) &&
                !ReactDOM.findDOMNode(this).contains(event.target)) {
            closeMobileNav();
        }
    };

    render() {
        const { categories, mobileNavOpen, closeMobileNav } = this.props;

        return (
            <Container>
                {mobileNavOpen &&
                    categories.map((category) => {
                        return (
                            <Link key={category} to={`/${category}`}>
                                <SideBarLink>{category}</SideBarLink>
                            </Link>
                        );
                    })
                }
            </Container>
        );
    }
}

MobileSideNav.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string),
};
