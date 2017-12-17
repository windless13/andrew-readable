import _ from 'lodash';
import {
    ADD_POST,
    EDIT_POST,
    VOTE_POST,
    DELETE_POST,
    RECEIVE_POSTS,
} from '../actions/types.js';

export const post = (state = {}, action) => {
    const {
        id,
        timestamp,
        title,
        author,
        body,
        category,
        voteBool,
        posts,
    } = action;

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [id]: {
                        id,
                        timestamp,
                        title,
                        body,
                        author,
                        voteScore: 0,
                        category,
                    },
                },
            };
        case EDIT_POST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [id]: {
                        ...state.posts[id],
                        title,
                        body,
                    },
                },
            };
        case VOTE_POST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [id]: {
                        ...state.posts[id],
                        voteScore: voteBool
                            ? state.posts[id].voteScore + 1
                            : state.posts[id].voteScore - 1,
                    },
                },
            };
        case DELETE_POST:
            return {
                ...state,
                posts: _.pickBy(state.posts, (post) => {
                    return post.id !== id;
                }),
            };
        case RECEIVE_POSTS:
            return {
                ...state,
                posts: _.reduce(posts, (result, value) => {
                    result[value.id] = {
                        id: value.id,
                        timestamp: value.timestamp,
                        title: value.title,
                        body: value.body,
                        author: value.author,
                        voteScore: value.voteScore,
                        category: value.category,
                    };
                    return result;
                }, {}),
            };
        default:
            return state;
    }
}
