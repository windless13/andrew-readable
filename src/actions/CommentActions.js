import {
    ADD_COMMENT,
    EDIT_COMMENT,
    VOTE_COMMENT,
    DELETE_COMMENT,
    RECEIVE_COMMENTS,
} from './types.js';
import * as ReadableAPI from '../ReadableAPI.js';

export const addComment = (postId, body, author) => dispatch => (
    ReadableAPI.addCommentToPost(null, null, postId, body, author).then((result) => {
        dispatch({
            type: ADD_COMMENT,
            id: result.id,
            postId,
            timestamp: result.timestamp,
            author,
            body,
        });
    })
)

export const editComment = (id, body) => dispatch => (
    ReadableAPI.editComment(id, body).then((result) => {
        dispatch({
            type: EDIT_COMMENT,
            id,
            timestamp: result.timestamp,
            body,
        })
    })
);

export const voteComment = (id, voteBool) => dispatch => (
    ReadableAPI.voteComment(id, voteBool).then(() => {
        dispatch({
            type: VOTE_COMMENT,
            id,
            voteBool,
        });
    })
);

export const deleteComment = (id) => dispatch => (
    ReadableAPI.deleteComment(id).then((result) => {
        dispatch({
            type: DELETE_COMMENT,
            id,
        });
    })
);

export const receiveComments = (postId) => dispatch => (
    ReadableAPI.getCommentsFromPost(postId).then((result) => {
        dispatch({
            type: RECEIVE_COMMENTS,
            comments: result,
        })
    })
);
