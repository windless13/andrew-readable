import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

import { fetchPosts, fetchCategories } from './actions';
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
        mobileNavOpen: false,
    }

    componentDidMount() {
        this.props.fetchPosts();
        this.props.fetchCategories();
    }

    closeMobileNav() {
        this.setState({
            mobileNavOpen: false,
        });
    }

    toggleMobileNav() {
        this.setState(prevState => ({
            mobileNavOpen: !prevState.mobileNavOpen,
        }));
    }

    render() {
        const {
            posts,
            categories,
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
                    categories={categories}
                />

                <Body>
                    <MediaQuery query={BREAKPOINTS.desktop}>
                        <SideNav
                            categories={categories}
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
                            exact path='/:category/:id/edit'
                            component={EditPostPage}
                        >
                        </Route>
                        <Route
                            exact path='/:category'
                            component={CategoryPage}
                        >
                        </Route>
                        <Route
                            path='/:category/:id'
                            component={PostPage}
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
        categories: post.categories,
    };
}

const mapDispatchToProps = { fetchPosts, fetchCategories };

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Readable));