import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'


import Vote from './Vote.js';
import CommentSection from './CommentSection.js';
import { COLORS } from '../constants.js';
import * as ReadableAPI from '../ReadableAPI.js';
import { addPost, receiveComments, votePost } from '../actions';

const Title = styled.div`
    font: 18px 'Helvetica';
`
const Middle = styled.div`
    display: flex;
    justify-content: space-between;
`;

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

    upVote = () => {
        const { post, votePost } = this.props;
        const id = post.id;

        ReadableAPI.votePost(id, votePost).then(() => {
            votePost({ id, voteBool: true });
        });
    };

    downVote = () => {
        const { post, votePost } = this. props;
        const id = post.id;

        ReadableAPI.votePost(this.props.post.id, false).then(() => {
            votePost({ id, voteBool: false });
        });

    };

    render() {
        const { comments, posts, post } = this.props;
        if (!post || !posts) return null;

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
        const currentVoteScore = posts && id && posts[id].voteScore;
        return (
            <div>
                <Link to={`/post/${id}`}>
                    <Title>{title}</Title>
                </Link>
                <Middle>
                    <Body>
                        {body}
                        <div>{id}</div>
                        <div>{category}</div>
                        <div>{timestamp}</div>
                    </Body>
                    <Vote
                        onIncrement={this.upVote.bind(this)}
                        onDecrement={this.downVote.bind(this)}
                        score={currentVoteScore}
                    />
                </Middle>
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

function mapStateToProps ({ comment, post }) {
    return {
        posts: post.posts,
        comments: comment.comments,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        addPost: (data) => dispatch(addPost(data)),
        votePost: (data) => dispatch(votePost(data)),
        receiveComments: (data) => dispatch(receiveComments(data)),
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);