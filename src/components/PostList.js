import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import Post from './Post.js';
import { COLORS } from '../constants.js';

const List = styled.ul`
    background-color: ${COLORS.yellow3};
`

const test = [1, 2, 3, 4, 5];

export default class PostList extends React.Component {
    render() {
        return (
            <List>
                { _.map(test, (item) => {
                    return (
                        <Post post={item} />
                    )
                })}
            </List>
        );
    }
}
