import uuid from 'js-uuid';

const url = 'http://localhost:3001';
const header = {
    'Authorization': 'andrew-readable-token',
}

export const getCategories = () => {
    return fetch(`${url}/categories`, { headers: header })
        .then(res => res.json())
        .then(data => data.categories)
}

export const getPosts = () => {
    return fetch(`${url}/posts`, { headers: header })
        .then(res => res.json())
}

export const addPost = (id, timestamp, title, author, body, category) => {
    return fetch(`${url}/posts`, {
        method: 'POST',
        headers: {
            ...header,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: uuid.v4(),
            timestamp: Date.now(),
            title,
            author,
            body,
            category,
        }),
    })
    .then(res => res.json());
}

export const getPostFromId = (id) => {
    return fetch(`${url}/posts/${id}`, { headers: header })
        .then(res => res.json());
}

export const votePost = (id, bool) => {
    return fetch(`${url}/posts/${id}`, {
        method: 'POST',
        headers: {
            ...header,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option: (bool ? 'upVote' : 'downVote')
        }),
    })
    .then(res => res.json());
}

export const getPostsFromCategory = (category) => {
    return fetch(`${url}/${category}/posts`, { headers: header })
        .then(res => res.json());
}

export const editPost = (id, title, body) => {
    return fetch(`${url}/posts/${id}`, {
        method: 'PUT',
        headers: {
            ...header,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            body,
        }),

    })
    .then(res => res.json());
}

export const deletePost = (id) => {
    return fetch(`${url}/posts/${id}`, {
        method: 'DELETE',
        headers: header,
    })
    .then(res => res.json());
}

export const getCommentsFromPost = (postId) => {
    return fetch(`${url}/posts/${postId}/comments`, { headers: header })
        .then(res => res.json())
}

export const addCommentToPost = (id, timestamp, postId, body, author) => {
    return fetch(`${url}/comments`, {
        method: 'POST',
        headers: {
            ...header,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id,
            timestamp,
            author,
            body,
            parentId: postId,
        }),
    })
    .then(res => res.json());
}

export const getCommentFromId = (id) => {
    return fetch(`${url}/comments/${id}`, { headers: header })
        .then(res => res.json());
}

export const voteComment = (id, bool) => {
    return fetch(`${url}/comments/${id}`, {
        method: 'POST',
        headers: {
            ...header,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option: (bool ? 'upVote' : 'downVote')
        }),
    })
    .then(res => res.json());
}

export const editComment = (id, body) => {
    return fetch(`${url}/comments/${id}`, {
        method: 'PUT',
        headers: {
            ...header,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            timestamp: Date.now(),
            body,
        }),

    })
    .then(res => res.json());
}

export const deleteComment = (id) => {
    return fetch(`${url}/comments/${id}`, {
        method: 'DELETE',
        headers: header,
    })
    .then(res => res.json());
}
