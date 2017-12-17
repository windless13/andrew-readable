import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { COLORS } from '../constants.js';
import { Icon } from 'react-fa'

const Container = styled.div`
    position: fixed;
    bottom: 30px;
    right: 30px;
    position: flex;

`

const Text = styled.div`
    visibility: hidden;
    position: absolute;
    left: -170px;
    white-space: nowrap;
    transition: all 0.25s ease-in 0.5s;

    &.visible {
        visibility: visible;
        left: -200px;
    }

    ${props => (props.isShowing && `
        left: -200px;
        color: green;


    `)}
`;

export default class AddPostSticky extends React.Component {
    render() {
        return (
            <Link to='/post/create'>
                <Container>
                        <Text innerRef={val => { this.textRef = val }}>
                            Click to add a new post!
                        </Text>
                    <div
                        onMouseEnter={(event) => {
                            const textRefNode = ReactDOM.findDOMNode(this.textRef);
                            textRefNode.classList.toggle('visible', true);
                        }}
                        onMouseLeave={(event) => {
                            const textRefNode = ReactDOM.findDOMNode(this.textRef);
                            textRefNode.classList.toggle('visible', false);
                        }}
                    >
                    <Icon
                        size='3x'
                        className="fa fa-plus-circle"
                        style={{
                            color: 'red',
                            boxShadow: 'inset 0 0 0 4px red',
                            width: '1em',
                            display: 'flex',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                        }}
                    />
                    </div>
                </Container>
            </Link>
        );
    }
}
