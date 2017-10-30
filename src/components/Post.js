import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

import { COLORS } from '../constants.js';

const Container = styled.div`
    background-color: ${COLORS.yellow2};
    font: 14px 'Helvetica';

`

export default class Post extends React.Component {
    render(){
        return (
            <Container>
                Hello
            </Container>
        );
    }
}
