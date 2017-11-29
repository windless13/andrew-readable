import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components';

import * as ReadableAPI from './ReadableAPI.js';

import Post from './components/Post.js';
import CreatePost from './components/CreatePost.js';
import EditPost from './components/EditPost.js';
import PostList from './components/PostList.js';
import Header from './components/Header.js';
import SideNav from './components/SideNav.js';

import { addPost, receivePosts, receiveComments } from './actions';

const Body = styled.div`
    display: flex;
`;

class Readable extends React.Component {
    state = {
        categories: [],
    }

    componentDidMount() {
        ReadableAPI.getPosts().then((result) => {
            this.props.receivePosts(result);
        });

        ReadableAPI.getCategories().then((result) => {
            this.setState({ categories: _.map(result, 'name') });
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

        const CategoryPage = (props) => {
            const category = props.match.params.category;
            const categoryPosts = _.filter(posts, ['category', category]);

            return (
                <PostList posts={categoryPosts} />
            )
        }

        const PostPage = (props) => {
            const postId = props.match.params.id;
            const post = !posts || posts[postId];
            console.log(postId);
            console.log(post);
            return (
                <Post post={post} />
            )
        }

        return (
            <div>
                <Header/>
                <Body>
                    <SideNav categories={this.state.categories}/>
                    <Switch>
                        <Route
                            path='/'
                            exact
                            render={() => (
                                <PostList posts={_.values(posts)} />
                            )}
                        >
                        </Route>
                        <Route
                            exact path ='/post/create'
                            component={CreatePost}
                        >
                        </Route>
                        <Route
                            exact path='/post/:id/edit'
                            component={EditPost}
                        >
                        </Route>
                        <Route
                            path='/post/:id'
                            component={PostPage}
                        >
                        </Route>
                        <Route
                            path='/:category'
                            component={CategoryPage}
                        >
                        </Route>
                    </Switch>
                </Body>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Readable));