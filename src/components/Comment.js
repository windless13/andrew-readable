import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Vote from './Vote.js';
import { COLORS, COMMENT_WIDTH } from '../constants.js';
import { voteComment, deleteComment } from '../actions';
import { DeleteButton, EditButton } from './form-inputs/Button.js';

const Container = styled.div`
    border: 1px solid black;
    display: flex;
    padding: 10px 20px;
    min-width: ${COMMENT_WIDTH};
    justify-content: space-between;
`

const Body = styled.div`
    flex-grow: 1;
    text-align: left;
`;

const Lower = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Text = styled.div`
    padding: 12px 0;
`;

const Author = styled.div`
    font-size: 14px;
    font-weight: 600;
`;

class Comment extends React.Component {
    onDelete = () => {
        const { comment, deleteComment } = this.props;
        deleteComment(comment.id);
    };

    upVote = () => {
        const { comment, voteComment } = this.props;
        const id = comment.id;

        voteComment(id, true);
    };

    downVote = () => {
        const { comment, voteComment } = this.props;
        const id = comment.id;

        voteComment(id, false);

    };

    render() {
        const { comment, openEditComment } = this.props;
        const date = new Date(comment.timestamp);
        const timestring = date.toLocaleTimeString();

        return (
            <Container>
                <Body>
                    <Author>{comment.author}:</Author>

                    <Text>{comment.body}</Text>

                    <Lower>
                        <i>{timestring}</i>
                        <div>
                            <EditButton onClick={() => {
                                openEditComment(comment);
                            }}/>

                            <DeleteButton
                                onClick={() => {
                                    this.onDelete();
                                }}
                            />
                        </div>
                    </Lower>


                </Body>
                <Vote
                    onIncrement={this.upVote.bind(this)}
                    onDecrement={this.downVote.bind(this)}
                    score={comment.voteScore}
                />

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

const mapDispatchToProps = { voteComment, deleteComment };

export default connect(
  null,
  mapDispatchToProps
)(Comment);
