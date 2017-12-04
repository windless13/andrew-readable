import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { COLORS } from '../constants.js';
import Comment from './Comment.js';
import CreateComment from './CreateComment.js';

const Header = styled.div`

`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: ${COLORS.lightBlue1};
    font: 12px 'Helvetica';
    text-align: center;
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
                <Header>Add a Comment</Header>
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
