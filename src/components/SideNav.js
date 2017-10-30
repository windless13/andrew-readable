import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../constants.js';

const Container = styled.div`
    height: 100%;
    position: fixed;
    background-color: ${COLORS.red2};
`

export default class SideNav extends React.Component {
    render(){
        return (
            <Container>

                Hello
            </Container>
        );
    }
}
