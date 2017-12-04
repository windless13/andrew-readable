import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom'

import { COLORS } from '../constants.js';
import RightMenu from './RightMenu.js';
import HamburgerIcon from '../icons/down.svg';

const MobileMenu = styled.div`
    position: absolute;
    left: 0;
    background-image: url(${HamburgerIcon});
    background-size: contain;
    background-repeat: no-repeat;
    height: 100%;
    width: 50px;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${COLORS.lightBlue1};
    height: 50px;
    font: 24px 'Helvetica';
    text-align: center;
    position: relative;
`

export default function Header() {
    return (
        <Container>
            <MobileMenu />
            <Link to='/'>
                Readable
            </Link>

            <RightMenu/>
        </Container>
    );
}
