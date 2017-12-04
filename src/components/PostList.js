import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import PropTypes from 'prop-types';

import Post from './Post.js';
import { COLORS } from '../constants.js';

const List = styled.ul`
    background-color: ${COLORS.yellow3};
    width: 100%;
`

const SortFilter = styled.select``;
export default class PostList extends React.Component {
    state = {
        filter: '',
    };

    getFilteredPosts() {
        const { posts } = this.props;
        if (this.state.filter === 'timestamp') {
            return _.filter(posts, 'timestamp');
        } else if (this.state.filter === 'vote') {
            return _.reverse(_.filter(posts, 'voteScore'));
        }

        return posts;
    }

    render() {
        const filteredPosts = this.getFilteredPosts();
        return (
            <div>
                { _.isEmpty(filteredPosts)
                    ? 'No posts found'
                    : <SortFilter value={this.state.filter}
                        onChange={(event) => {
                            this.setState({
                                filter: event.target.value
                            })
                        }}
                    >
                        <option disabled hidden value=''></option>
                        <option value='timestamp'>Timestamp</option>
                        <option value='vote'>Vote</option>
                    </SortFilter>
                }
                <List>
                    { _.map(filteredPosts, (post) => {
                        return (
                            <Post key={post.id} post={post} />
                        )
                    })}
                </List>
            </div>
        );
    }
}

PostList.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({})),
};
