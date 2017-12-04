import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { COLORS } from '../constants.js';

const Container = styled.div`
    position: fixed;
    bottom: 70px;
    right: 100px;
    background-color: ${COLORS.red2};
`

export default function AddPostSticky() {
    return (
        <Link to='/post/create'>
            <Container>
                New Post
            </Container>
        </Link>
    );
}
