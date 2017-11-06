import React from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import * as ReadableAPI from './ReadableAPI.js';
import PostList from './components/PostList.js';
import Header from './components/Header.js';
import SideNav from './components/SideNav.js';

import { addPost, receivePosts } from './actions';


class Readable extends React.Component {
    componentDidMount() {
        console.log('hi');
        console.log(this.props);
        this.addPost();
        ReadableAPI.getPosts().then((result) => {
            this.props.receivePosts(result);
            console.log(result);
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
        return (
            <div>
                <Header/>
                <SideNav/>
                <Route
                    exact path='/'
                    render={() => (
                        <PostList />
                    )}
                >
                </Route>
            </div>
        );
    }
}

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
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Readable);