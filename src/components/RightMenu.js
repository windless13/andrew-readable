import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    right: 0;
    top: 0;
`

export default class RightMenu extends React.Component {
    render(){
        return (
            <Container>
                Right Menu!
            </Container>
        );
    }
}
