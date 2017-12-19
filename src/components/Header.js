import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom'
import MediaQuery from 'react-responsive';

import { COLORS, BREAKPOINTS } from '../constants.js';
import MobileSideNav from './MobileSideNav.js';
import HamburgerIcon from '../icons/down.svg';
import { Icon } from 'react-fa'

const HamburgerStyle = {
    position: 'absolute',
    left: '20px',
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${COLORS.lightBlue1};
    height: 50px;
    font: 24px 'Helvetica';
    text-align: center;
    position: relative;

    @media screen and (min-width: ${BREAKPOINTS.mobile_bp}) {
        height: 80px;
    }
`

const HeaderTitle = styled.div`
    text-decoration: 'none';
    color: black;

    &:hover {
        color: ${COLORS.gray3};
    }
`;

export default class Header extends React.Component {
    render() {
        const { categories, toggleMobileNav, closeMobileNav, mobileNavOpen } = this.props;

        return (
            <Container>
                <MediaQuery query={BREAKPOINTS.mobile}>
                    <Icon
                        name="FaBars"
                        size='1x'
                        style={HamburgerStyle}
                        className="fa fa-bars"
                        onClick={(event) => {
                            toggleMobileNav();
                        }}
                        ref={(hamburger) => { this.hamburger = hamburger; }}
                    />
                        <MobileSideNav
                            hamburgerRef={this.hamburger}
                            mobileNavOpen={mobileNavOpen}
                            closeMobileNav={closeMobileNav}
                            categories={categories}
                        />
                </MediaQuery>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <HeaderTitle>Readable</HeaderTitle>
                </Link>
            </Container>
        );
    }
}
