import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { COLORS, BREAKPOINTS, SIDENAV_WIDTH } from '../constants.js';
import Post from './Post.js';
import SortFilter from './SortFilter.js';

const Container = styled.div`
    @media screen and (min-width: ${BREAKPOINTS.mobile_bp}) {
    }
`;

const List = styled.div`
`;

const NoPosts = styled.div`
    font: 16px arial;
    padding: 18px;
`;

const SortFilterContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px
`;

export default class PostList extends React.Component {
    state = {
        filter: '',
    };

    onSelectFilter(event) {
        this.setState({
            filter: event.target.value
        });
    }

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
            <Container>
                { _.isEmpty(filteredPosts)
                    ? <NoPosts>No posts found</NoPosts>
                    : <SortFilterContainer>
                        <span style={{paddingRight: '10px'}}>Sort by</span>
                        <SortFilter
                            value={this.state.filter}
                            onSelectFilter={this.onSelectFilter.bind(this)}
                        />
                    </SortFilterContainer>
                }
                <List>
                    { _.map(filteredPosts, (post) => {
                        return (
                            <Post key={post.id} post={post} />
                        )
                    })}
                </List>
            </Container>
        );
    }
}

PostList.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({})),
};
