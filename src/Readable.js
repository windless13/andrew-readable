import React from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import * as ReadableAPI from './ReadableAPI.js';
import PostList from './components/PostList.js';
import Header from './components/Header.js';
import SideNav from './components/SideNav.js';

import { addPost, receivePosts, receiveComments } from './actions';


class Readable extends React.Component {
    componentDidMount() {
        ReadableAPI.getPosts().then((result) => {
            this.props.receivePosts(result);
        });
    }

    addPost() {
        this.props.addPost({
            id: 'fake id',
            timestamp: 'fakew timestamp',
            title: 'title',
            author: 'author',
            body: 'body',
            category: 'react',
        });
    }

    render() {
        const {
            posts,
            comments,
        } = this.props;

        console.log('readable render');
        console.log(this.props);
        console.log(posts);

        return (
            <div>
                <Header/>
                <SideNav/>
                <Route
                    exact path='/'
                    render={() => (
                        <PostList posts={posts} />
                    )}
                >
                </Route>

            </div>
        );
    }
}

function mapStateToProps ({ post, comment }) {
    return {
        posts: post.posts,
        comments: comment.comments,
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
)(Readable);