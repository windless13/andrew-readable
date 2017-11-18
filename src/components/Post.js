import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import { COLORS } from '../constants.js';
import * as ReadableAPI from '../ReadableAPI.js';
import { addPost, receivePosts, receiveComments } from '../actions';

const Title = styled.div`
    font: 18px 'Helvetica';
`

const Body = styled.div`
    background-color: ${COLORS.yellow2};
    font: 14px 'Helvetica';
`

class Post extends React.Component {
    render() {
        const {
            id,
            title,
            author,
            body,
            category,
            timestamp,
            voteScore,
        } = this.props.post;

        return (
            <div>
                <Title>{title}</Title>
                <Body>
                    {body}
                    <div>{id}</div>
                    <div>{category}</div>
                    <div>{timestamp}</div>
                </Body>

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

// remember, store.post.posts
function mapStateToProps ({ posts, comments }) {
    return {
        posts,
        comments,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        addPost: (data) => dispatch(addPost(data)),
        receivePosts: (data) => dispatch(receivePosts(data)),
        receiveComments: (data) => dispatch(receiveComments(data)),
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);