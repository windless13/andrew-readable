import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import CommentSection from './CommentSection.js';
import { COLORS } from '../constants.js';
import * as ReadableAPI from '../ReadableAPI.js';
import { addPost, receiveComments } from '../actions';

const Title = styled.div`
    font: 18px 'Helvetica';
`

const Body = styled.div`
    background-color: ${COLORS.yellow2};
    font: 14px 'Helvetica';
`

class Post extends React.Component {
    componentDidMount() {
        const { post, receiveComments } = this.props;
        if (post && post.id) {
            ReadableAPI.getCommentsFromPost(post.id).then((result) => {
                receiveComments(result);
            });
        }
    }

    render() {
        const { comments, post } = this.props;
        if (!post) return null;

        const {
            id,
            title,
            author,
            body,
            category,
            timestamp,
            voteScore,
        } = post;

        const commentsForPost = comments && id && _.filter(comments, ['postId', id]);

        return (
            <div>
                <Link to={`/post/${id}`}>
                    <Title>{title}</Title>
                </Link>
                <Body>
                    {body}
                    <div>{id}</div>
                    <div>{category}</div>
                    <div>{timestamp}</div>
                </Body>
                <CommentSection postId={id} comments={commentsForPost} />
            </div>
        );
    }
}

Post.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        author: PropTypes.string,
        body: PropTypes.string,
        category: PropTypes.string,
        timestamp: PropTypes.number,
        voteScore: PropTypes.number,
    }),
}

function mapStateToProps ({ comment }) {
    return {
        comments: comment.comments,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        addPost: (data) => dispatch(addPost(data)),
        receiveComments: (data) => dispatch(receiveComments(data)),
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);