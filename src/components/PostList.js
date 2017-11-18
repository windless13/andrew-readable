import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import PropTypes from 'prop-types';

import Post from './Post.js';
import { COLORS } from '../constants.js';

const List = styled.ul`
    background-color: ${COLORS.yellow3};
`

const test = [1, 2, 3, 4, 5];

export default class PostList extends React.Component {
    render() {
        const {
            posts,
        } = this.props;

        console.log('redner');
        console.log(posts);
        console.log(this.props);

        return (
            <List>
                { _.map(posts, (post) => {
                    return (
                        <Post key={post.id} post={post} />
                    )
                })}
            </List>
        );
    }
}

PostList.propTypes = {
    posts: PropTypes.shape({}),
};
