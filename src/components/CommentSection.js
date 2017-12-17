import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { COLORS } from '../constants.js';
import Comment from './Comment.js';
import CreateComment from './CreateComment.js';

const Header = styled.div`
    padding: 10px 0;
    font: 18px 'Helvetica';
    text-transform: uppercase;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font: 12px 'Helvetica';
    text-align: center;
    width: 100%;
    background: ${COLORS.yellow1};
`

export default class CommentSection extends React.Component {
    state = {
        editCommentOpen: false,
        edit: null,
    };

    closeEditComment() {
        this.setState({
            editCommentOpen: false,
        });
    }

    openEditComment(comment) {
        this.setState({
            editCommentOpen: true,
            edit: comment,
        });
    };

    render(){
        const { edit, editCommentOpen } = this.state;
        const { comments, postId } = this.props;

        return (
            <Container>
                {_.map(comments, (comment) => {
                    return (
                        editCommentOpen && (edit && edit.id === comment.id)
                        ? <CreateComment
                            onClose={this.closeEditComment.bind(this)}
                            postId={postId}
                            edit={edit}
                        />
                        : <Comment
                            key={comment.id}
                            openEditComment={this.openEditComment.bind(this)}
                            comment={comment}
                        />
                    );
                })}
                <Header>Add a Comment</Header>

                <CreateComment
                    postId={postId}
                />
            </Container>
        );
    }
}

CommentSection.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape()),
    postId: PropTypes.string,
}
