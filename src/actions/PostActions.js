import {
    ADD_POST,
    EDIT_POST,
    VOTE_POST,
    DELETE_POST,
} from './types.js';

export const addPost = (id, timestamp, title, author, body, category) => {
    return {
        type: ADD_POST,
        id,
        timestamp,
        title,
        author,
        body,
        category,
    }
}

export const editPost = (id, title, body) => {
    return {
        type: EDIT_POST,
        id,
        title,
        body,
    }
}

export const votePost = (id, voteBool) => {
    return {
        type: VOTE_POST,
        id,
        voteBool,
    }
}

export const deletePost = (id) => {
    return {
        type: DELETE_POST,
        id,
    }
}
