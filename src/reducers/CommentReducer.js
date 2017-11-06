import _ from 'lodash';
import {
    ADD_COMMENT,
    EDIT_COMMENT,
    VOTE_COMMENT,
    DELETE_COMMENT,
} from '../actions/types.js';

export const comment = (state = {}, action) => {
    const {
        id,
        postId,
        timestamp,
        author,
        body,
        voteBool,
    } = action;

    switch (action.type) {
        case ADD_COMMENT:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    id: {
                        postId,
                        timestamp,
                        author,
                        body,
                        voteScore: 0,
                    },
                },
            };
        case EDIT_COMMENT:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    id: {
                        ...state.comments.id,
                        timestamp,
                        body,
                    },
                },
            };
        case VOTE_COMMENT:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    id: {
                        ...state.comments.id,
                        voteScore: voteBool
                            ? state.comments.id.voteScore + 1
                            : state.comments.id.voteScore - 1,
                    },
                },
            };
        case DELETE_COMMENT:
            return {
                ...state,
                comments: _.filter(state.comments, (comment) => {
                    return comment.id !== id;
                }),
            };
        default:
            return state;
    }
}