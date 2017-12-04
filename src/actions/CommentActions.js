import {
    ADD_COMMENT,
    EDIT_COMMENT,
    VOTE_COMMENT,
    DELETE_COMMENT,
    RECEIVE_COMMENTS,
} from './types.js';

export const addComment = ({ id, timestamp, postId, author, body }) => {
    return {
        type: ADD_COMMENT,
        id,
        postId,
        timestamp,
        author,
        body,
    }
}

export const editComment = ({ id, timestamp, body }) => {
    return {
        type: EDIT_COMMENT,
        id,
        timestamp,
        body,
    }
}

export const voteComment = ({ id, voteBool }) => {
    return {
        type: VOTE_COMMENT,
        id,
        voteBool,
    }
}

export const deleteComment = ({ id }) => {
    return {
        type: DELETE_COMMENT,
        id,
    }
}

export const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments,
})
