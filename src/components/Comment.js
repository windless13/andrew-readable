import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { COLORS } from '../constants.js';
import PropTypes from 'prop-types';


const Container = styled.div`
    border: 1px solid black;
`

const Body = styled.div`

`;

const Lower = styled.div`
    display: flex;
`

const Author = styled.div``;

const Timestamp = styled.div``;



export default function Comment({ comment, openEditComment }) {
    return (
        <Container>
            <Body>{comment.body}</Body>
            <Lower>
                <Author>{comment.author}</Author>
                <Timestamp>{comment.timestamp}</Timestamp>
            </Lower>
            <div onClick={() => {
                openEditComment(comment);
            }}>
                Edit
            </div>
        </Container>
    );
}

Comment.propTypes = {
    comment: PropTypes.shape({
        body: PropTypes.string,
    }),
    openEditComment: PropTypes.func,
}
