import {
    ADD_POST,
    EDIT_POST,
    VOTE_POST,
    DELETE_POST,
} from '../actions/types.js';

const post = (state = {}, action) => {
    const {
        id,
        timestamp,
        title
        author,
        body,
        category,
        voteBool,
    } = action;

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    id: {
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
                    id: {
                        ...state.posts.id,
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
                    id: {
                        ...state.posts.id,
                        voteScore: voteBool
                            ? state.posts.id.voteScore + 1
                            : state.posts.id.voteScore - 1,
                    },
                },
            };
        case DELETE_POST:
            return {
                ...state,
                posts: _.filter(posts, (post) => {
                    return post.id !== id;
                }),
            };
        default:
            return state;
    }
}
