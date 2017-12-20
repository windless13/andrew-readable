import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Icon } from 'react-fa'
import MediaQuery from 'react-responsive';

import { COLORS, BREAKPOINTS } from '../constants.js';
import * as ReadableAPI from '../ReadableAPI.js';
import { addPost, receiveComments, votePost, deletePost } from '../actions';
import { DeleteButton, EditButton } from './form-inputs/Button.js';
import Vote from './Vote.js';
import CommentSection from './CommentSection.js';

const CommentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

const PostContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${COLORS.yellow1};
    border: 1px solid black;
    width: 100%;

    @media screen and (min-width: ${BREAKPOINTS.mobile_bp}) {
        padding: 20px 50px;
        min-width: 500px;
        max-width: 800px;
        width: auto;
    }
`;

const VoteWrapper = styled.div`
    padding: 10px;
`;

const PostInfo = styled.div`
    padding: 10px;
    max-width: 500px;
    flex-grow: 1;
`;

const PostHeader = styled.div`
    display: flex;
    flex-wrap: wrap;

    justify-content: space-between;
    align-items: center;
`;

const Title = styled.div`
    font: 18px 'Helvetica';
    text-decoration: none;
    color: black;
    padding-bottom: 6px;

    &:hover {
        color: blue;
    }
`

const Author = styled.div`
    font: 12px 'Helvetica';
    text-decoration: none;
    color: black;

`;

const NumComments = styled.div`
    position: absolute;
    top: 4px;
    right: 4px;
    display: flex;
    align-items: center;

    @media screen and (min-width: ${BREAKPOINTS.mobile_bp}) {
        top: 16px;
        right: 16px;
    }
`;

const Middle = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Bottom = styled.div`
    padding-top: 4px;
    display: flex;
    justify-content: space-between;
`;

const Timestamp = styled.div`
    font-size: 12px;
    font-style: italic;
`;

const Body = styled.div`
    font: 14px 'Helvetica';
    padding: 10px 0;
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
        const { post, votePost } = this.props;
        const id = post.id;

        ReadableAPI.votePost(this.props.post.id, false).then(() => {
            votePost({ id, voteBool: false });
        });

    };

    deletePost = () => {
        const { post, deletePost } = this.props;
        ReadableAPI.deletePost(post.id).then(() => {
            deletePost({ id: post.id });
        });
    }

    render() {
        const { comments, post, showComments } = this.props;
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

        const commentsForPost = comments && id && _.filter(comments, {'postId': id});
        const timestampDate = new Date(timestamp);
        const dateString = timestampDate.toLocaleTimeString();

        return (
            <CommentWrapper>
                <PostContainer>
                    <PostInfo>
                        <PostHeader>
                            <Link
                                style={{
                                    flex: '1 0 100%',
                                    textDecoration: 'none',
                                    paddingBottom: '18px',
                                }}
                                to={`/${category}/${id}`}
                            >
                                <Title>{title}</Title>
                                <Author>
                                    <Icon
                                        name="FaCommentO"
                                        size='lg'
                                        style={{ paddingRight: '8px' }}
                                        className="fa fa-user"
                                    />
                                    {author}
                                </Author>
                            </Link>
                            <NumComments>
                                <MediaQuery query={BREAKPOINTS.mobile}>
                                    <Icon
                                        name="FaCommentO"
                                        size='2x'
                                        style={{ paddingRight: '8px' }}
                                        className="fa fa-comments-o"
                                    />
                                    {`${_.size(commentsForPost)}`}
                                </MediaQuery>
                                <MediaQuery query={BREAKPOINTS.desktop}>
                                    <Icon
                                        name="FaCommentO"
                                        size='1x'
                                        style={{
                                            paddingRight: '8px',
                                            paddingLeft: '16px',
                                        }}
                                        className="fa fa-comments-o"
                                    />
                                    {`${_.size(commentsForPost)}`}
                                    {' '}comments
                                </MediaQuery>
                            </NumComments>
                        </PostHeader>

                        <Middle>
                            <Body>
                                {body}
                            </Body>

                        </Middle>
                        <Bottom>
                            <div>
                                <Link to={`/${category}/${id}/edit`}>
                                    <EditButton />
                                </Link>
                                <DeleteButton
                                    onClick={() => {
                                        this.deletePost();
                                    }}
                                />
                            </div>
                            <Timestamp>
                                {dateString}
                            </Timestamp>
                        </Bottom>
                    </PostInfo>
                    <VoteWrapper>
                        <Vote
                            onIncrement={this.upVote.bind(this)}
                            onDecrement={this.downVote.bind(this)}
                            score={post.voteScore}
                        />
                    </VoteWrapper>
                </PostContainer>
                { showComments &&
                    <CommentSection postId={id} comments={commentsForPost} />
                }
            </CommentWrapper>
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
    showComments: PropTypes.bool,
}

function mapStateToProps ({ comment }) {
    return {
        comments: comment.comments,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        addPost: (data) => dispatch(addPost(data)),
        votePost: (data) => dispatch(votePost(data)),
        deletePost: (data) => dispatch(deletePost(data)),
        receiveComments: (data) => dispatch(receiveComments(data)),
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);