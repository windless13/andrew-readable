import {
    ADD_POST,
    EDIT_POST,
    VOTE_POST,
    DELETE_POST,
    RECEIVE_POSTS,
    FETCH_POSTS,
    FETCH_CATEGORIES,
} from './types.js';
import * as ReadableAPI from '../ReadableAPI.js';

export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts,
})

export const fetchPosts = () => dispatch => (
    ReadableAPI.getPosts().then((result) => {
        dispatch(receivePosts(result));
    })
);

export const fetchCategories = () => dispatch => (
    ReadableAPI.getCategories().then((result) => {
        dispatch({ type: FETCH_CATEGORIES, result });
    })
);

export const addPost = (title, author, body, category) => dispatch => (
    ReadableAPI.addPost(null, null, title, author, body, category).then((result) => {
        dispatch({
            type: ADD_POST,
            id: result.id,
            timestamp: result.timestamp,
            title,
            body,
            author,
            category,
        });
    })
)

export const editPost = (id, title, body) => dispatch => (
    ReadableAPI.editPost(id, title, body).then((result) => {
        dispatch({
            type: EDIT_POST,
            id,
            title,
            body,
        });
    })
)

export const votePost = (id, voteBool) => dispatch => (
    ReadableAPI.votePost(id, voteBool).then(() => {
        dispatch({
            type: VOTE_POST,
            id,
            voteBool,
        });
    })
)

export const deletePost = (id) => dispatch => (
    ReadableAPI.deletePost(id).then(() => {
        dispatch({
            type: DELETE_POST,
            id,
        });
    })
);
