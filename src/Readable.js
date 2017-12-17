import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

import * as ReadableAPI from './ReadableAPI.js';
import { receivePosts } from './actions';
import { COLORS, BREAKPOINTS } from './constants.js';

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
        mobileNavOpen: false,
    }

    componentDidMount() {
        ReadableAPI.getPosts().then((result) => {
            this.props.receivePosts(result);
        });

        ReadableAPI.getCategories().then((result) => {
            this.setState({ categories: _.map(result, 'name') });
        });
    }

    closeMobileNav() {
        console.log('close');
        this.setState({
            mobileNavOpen: false,
        });
    }

    toggleMobileNav() {
        console.log('toggle');
        this.setState(prevState => ({
            mobileNavOpen: !prevState.mobileNavOpen,
        }));
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
                <Post post={post} showComments />
            )
        }

        return (
            <div>
                <Header
                    mobileNavOpen={this.state.mobileNavOpen}
                    toggleMobileNav={this.toggleMobileNav.bind(this)}
                    closeMobileNav={this.closeMobileNav.bind(this)}
                    categories={this.state.categories}
                />

                <Body>
                    <MediaQuery query={BREAKPOINTS.desktop}>
                        <SideNav
                            categories={this.state.categories}
                        />
                    </MediaQuery>
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