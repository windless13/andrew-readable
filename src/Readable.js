import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components';

import * as ReadableAPI from './ReadableAPI.js';
import { receivePosts } from './actions';

import Post from './components/Post.js';
import CreatePost from './components/CreatePost.js';
import PostList from './components/PostList.js';
import Header from './components/Header.js';
import SideNav from './components/SideNav.js';
import AddPostSticky from './components/AddPostSticky.js';

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

    render() {
        const {
            posts,
        } = this.props;

        // Route Components "pages"
        const EditPostPage = function(props) {
            const id = props.match.params.id;
            const post = id && posts && posts[id];

            return (
                <CreatePost edit={post} />
            );
        }.bind(this);

        const CategoryPage = (props) => {
            const category = props.match.params.category;
            const categoryPosts = _.filter(posts, ['category', category]);

            return (
                <PostList posts={categoryPosts} />
            )
        }

        const PostPage = (props) => {
            const postId = props.match.params.id;
            let post = null;
            if (posts && postId) {
                post = posts[postId];
            }

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
                            component={EditPostPage}
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
                <AddPostSticky />
            </div>
        );
    }
}

function mapStateToProps ({ post }) {
    return {
        posts: post.posts,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        receivePosts: (data) => dispatch(receivePosts(data)),
    }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Readable));