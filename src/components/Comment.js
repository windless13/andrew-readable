import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { COLORS } from '../constants.js';
import PropTypes from 'prop-types';
import * as ReadableAPI from '../ReadableAPI.js';
import { voteComment, deleteComment } from '../actions';

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

const Delete = styled.div``;


class Comment extends React.Component {
    onDelete = () => {
        const { comment, deleteComment } = this.props;
        ReadableAPI.deleteComment(comment.id).then(() => {
            deleteComment({ id: comment.id });
        });
    }

    render() {
        const { comment, openEditComment } = this.props;

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

                <Delete
                    onClick={() => {
                        this.onDelete();
                    }}
                >
                    Delete
                </Delete>
            </Container>
        );
    }
}

Comment.propTypes = {
    comment: PropTypes.shape({
        body: PropTypes.string,
    }),
    openEditComment: PropTypes.func,
}

// function mapStateToProps ({ comment, post }) {
//     return {
//         posts: post.posts,
//         comments: comment.comments,
//     };
// }

function mapDispatchToProps (dispatch) {
    return {
        voteComment: (data) => dispatch(voteComment(data)),
        deleteComment: (data) => dispatch(deleteComment(data)),
    }
}

export default connect(
  null,
  mapDispatchToProps
)(Comment);
