import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

import RightMenu from './RightMenu.js';
import { COLORS } from '../constants.js';
import { Route, Link } from 'react-router-dom'

const Container = styled.div`
    background-color: ${COLORS.lightBlue1};
    font: 24px 'Helvetica';
    text-align: center;
    position: relative;
`

export default class Header extends React.Component {
    render(){
        return (
            <Container>
                <Link to='/'>
                    Readable
                </Link>

                <RightMenu/>
            </Container>
        );
    }
}
